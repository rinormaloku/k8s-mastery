# Kubernetes Liveness & Readiness Probes

In this branch we will demonstrate Liveness & Readiness Probes. Let's start with the first one.

## Liveness Probes

With the application previously started hit the endpoint `/health` of `sa-web-app` service.

```
curl http://${SA_WEB_APP_IP}/health
```
Now let's simulate that the application gets into a corrupted state:

```
curl http://${SA_WEB_APP_IP}/destroy
```

The call to the endpoint `destroy` turns on a flag to throw exceptions on every subsequent call. Let's verify this:

```
curl http://${SA_WEB_APP_IP}/health
```
An internal server error is returned. That's a sign that the application is **not healthy**, but Kubernetes doesn't restart it. And that's because for Kubernetes there are no health problems. We need to inform Kubernetes how to do health checks. That;s what Liveness Probes do.

## Liveness Probes Introduction 
Liveness probes are defined in the container definition in the PodSpec as shown below:

```yaml
# removed for brevity
        livenessProbe: 
          httpGet:                # 1
            path: /health         # 2
            port: 8080      
```

1. **httpGet** defines that we are making an http request. Other options are **exec** and **tcp**
2. **path** defines the path to be called.

The resource manifest for `sa-web-app` deployment is in `[root]/resource-manifests/liveness/sa-web-app-deployment.yaml`, apply it by executing:

```
kubectl apply -f resource-manifests/liveness/sa-web-app-deployment.yaml
```

Let's kill the container again:

```
curl http://${SA_WEB_APP_IP}/destroy
```

Verify that the container restarts by observing the output for approx. 40 seconds:

```
$ kubectl get pods -w
NAME                          READY   STATUS    RESTARTS   AGE
sa-web-app-5bcc9857d6-5f2tk   1/1     Running   0          3m
sa-web-app-5bcc9857d6-rkxvs   1/1     Running   0          3m
sa-web-app-5bcc9857d6-rkxvs   1/1     Running   1          4m
```

Kubernetes now is informed when an application is not healthy, and performs healthcheks in the way we defined them. The healthcheck is internally done by the kubelet. Kubelet?!

> The kubelet is the agent installed in every node that recieves the PodSpec and makes sure to run the containers and keep them healthy (or restart otherwise).

### Health Check Properties
The healthchecks are configurable with different properties, we can investigate the default configuration by executing the command below:

```
$ kubectl describe pod <pod_name> | grep Liveness:
    Liveness:       http-get http://:8080/health delay=0s timeout=1s period=10s #success=1 #failure=3
```
In this output we can see how the liveness probe is performed.
* delay=0 - there is no delay for starting the health checks.
* timeout=1s - after a probe timeout for 1 second.
* period=10s - try every 10 seconds.
* failure=3 - after 3 failures mark the pod as Unhealthy.
* success=1 - Mark the service as Healthy if it passes one successful check.

A sample definition with all of the properties:
```
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 2  # delay proeprty
          failureThreshold: 5     # failure property
          timeoutSeconds: 3       # timeout property
          periodSeconds: 10       # period property
          successThreshold: 1     # success property
```

**Question:** What happens if a application takes 1 minute to get started? 
**Follow up question:** Which property will solve the problem?

# Graceful Shutdown Period

In the file `[root]/resource-manifests/liveness/sa-web-app-deployment.yaml` we squezed another important line that we want to take a closer look at:

```
terminationGracePeriodSeconds: 60
```

This informs the Kubelet to give our application 60 seconds of time to gracefully shutdown, befor killing the process. 
For applications with state and or long running transactions this is very important.

The termination cycle goes as follows:
```
[Application Unhealthy]

1 2
│ ├── preStop Hook is triggered
│ │
│ ├── SIGTERM signal sent to the pod
│ │
x ├── SIGKILL signal sent to the pod.
```

* The vertical line 1. represents the time of terminationGracePeriodSeconds which is being count from the moment the application is unhealthy. When defining the value for terminationGracePeriodSeconds you need to take into account the period of time it takes for the preStop Hook to complete. If it takes longer than the gracefull shutdown the SIGKILL command will be executed before it going to completion.
* The vertical line 2. represents the lifecycle until we get to SIGKILL. The first two steps should ensure that the pod is gracefully shut down.

Kubernetes doesn't have to wait for the entire termination grace period, if the application terminates earlier then the process is killed.

> The applications need to be updated to properly handle the SIGTERM signal. Going into this is out of the scope of this article.

# Readiness Probes
Liveness Probes ensure that the application is healthy (and restarted when not) meanwhile Readiness Probes ensure when requests can be loadbalanced to the application.

To put it blantly: 
- Liveness Probes optimize the time in which an application is in healthy state.
- Readiness Probes optimize the success rate of requests, by not forwarding traffic when the application is not ready.

The application should not recieve requests in the following typical scenarios: 
* During starting phase of the application. For an application to be ready to recieve requests it can take minutes. 
* While the application is not healthy. There is a period of graceful shutdown for the application where it is still Running but it should not recieve requests.

Sounds good let's apply the following readiness probe:

```
        readinessProbe:
          httpGet:  
            path: /health
            port: 8080
          periodSeconds: 5
          failureThreshold: 1
          successThreshold: 1
          timeoutSeconds: 1
```

By executing the command below:
```
$ kubectl apply -f resource-manifests/readiness/sa-web-app-deployment.yaml 
deployment.extensions/sa-web-app configured
```

The deployment is configured with both liveness and readiness probes. Let's but this in a test in the next section.

# Liveness and Readiness probe in Action

Follow the following three steps:
1. Open Terminal #1 to verify pod going into NotReady state when the application goes corrupt:
```
$ kubectl get pods -w
NAME                          READY   STATUS    RESTARTS   AGE
sa-web-app-5bcc9857d6-5f2tk   1/1     Running   0          3m28s
sa-web-app-5bcc9857d6-rkxvs   1/1     Running   0          3m28s
```

2. Open Terminal #2 and execute a get request for the pods health every 0.5 seconds:
```
$ watch -n .5 curl http://${SA_WEB_APP_IP}/health
```

3. Open Terminal #3 and hit the destroy endpoint:
```
curl http://${SA_WEB_APP_IP}/destroy
```

Observations:
* In terminal #2 you will see failures for the service that is unhealthy
* In terminal #1 you will see that the unhealthy service goes into Not Ready state `Ready (0/1)` as the readiness probe has failed.
* In terminal #1 after approx. 30 seconds, the container will restart as the liveness probe has failed and a couple of seconds more and it will switch to ready state.

**Bonus:** In kubernetes you can check the logs of the last pod by using --previous flag. Also `kubectl logs <pod-name> --previous`

# Summary
In this article you learned about Liveness and Readiness probes. 
* How they work together to ensure that the application is healthy and 
* When an applicaiton is Ready and Not Ready.
* How we can configure the kubelets to check for Readiness and Healthiness using the PodSpec.

Now you gotta figure out the best configuration for your app ;)