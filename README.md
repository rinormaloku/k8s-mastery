# Kubernetes Resource Requests & Limits

Memory and CPU are limited resources and we have to keep in mind that services running in the same VM are sharing these.

Kubernetes provides us with a couple of properties to optimize resource usage.

## Resource Requests
By default Kubernetes is not informed how much resources an application requires, and if we don't provide that information Kubernetes can decide to not allocate any CPU time to that specific container, due to other important processes requesting the CPU time.

To avoid this (and for additional benefits that we will clarfiy later on), kubernetes provides us with the possibility to define the resources that a container requests.

### Resource Requests in Action

Let's checkout the resource requests definition for the `sa-frontend` service:
```yaml
    resources:
      requests:
        cpu: 100m
        memory: 64Mi
``` 

We request that this container has at least 100 milicores CPU and 64 Mebibytes of total memory. We selected these values considering that `sa-frontend` is not doing any intensive processing and neither storing a lot of data in the memory.

A good rule of thumb is to always keep cpu and memory requests low, and to easily scale the deployment.

Summary: Using resource requests we make sure that our application gets at least the specified amount of resources, but we do not limit it to that, meaning that the container is allowed to take more resources, and this can cause different problems as we will see.

## Resource Limits
Lets imagine that we live in a world where malicious users want to take our app down, yes our world. They perform a Denial-of-Service attack by just flooding our `sa-frontend` service with requests. Because we didn't set resource limits `sa-frontend` will require all resources, causing starvation of the other services. This can be simply avoided using Resource Limits. 

### Resource Limits in Action
Let's update the resource definition for `sa-frontend` to limit resource usage as well.
```yaml
    resources:
      requests:
        cpu: 100m
        memory: 64Mi
      limits:
        cpu: 150m
        memory: 124Mi
```

That's it. Now when we have a flood of requests our application will top out at 150 milicores and won't disrupt the other services.

### Limits are meant to be broken?!

https://twitter.com/BoJackHorseman/status/989628416629424128
This is a very insperational quote from BoJack, but kubernetes is very strict into maintaining limits.

There is a clear distinction on how CPU and Memory are limited to an application in Kubernetes. 
* CPU is a compressible resource, and the application simple doesn't get more CPU time allocated then the limit defines it. That's a very clean solution. 
* Memory on the contrary, is not compressible, an application cannot be limited to not exceed the memory limits, so kubernetes deals with containers that exceed the memory limits by killing it. 

To verify if a container is killed due to exceeding memory limit execute the command `kubectl describe pod <name>` and under Containers you will find the reason of Termination. The state `OOMKilled` means that the container was killed because it exceeded the memory limit.

# Kubernetes Scheduler
Because the resource requests define the minimum for an application to be able to run, the kubernetes scheduler will schedule the pod in one of the VM's that has the required amount of resources, or the pod will end up not being scheduled.

It's important to know how the scheduler knows if a node has the proper amount of resources, intuitively you might think that it checks the actual usage but what it actually does is just summing up the total Resource Requests for all running containers.

This is visualised much better in the figure below:
[Fig to be added]

In the example above we see that the resources request only 80%, the rest is left unallocated, this is the amount of resources that will be shared proportionally across all pods according to their limits. (If these resources suffice the total requests of a pod then it will be scheduled in the VM as well).

## Details for Application Developers
### Processing
Applications optimize execution by making use of parallel processing, they automatically look up the number of cores and reserve a bigger thread pool. 
An example to illustrate this: We are running a Java Application on a VM with 16 vCPU and we are limiting it to 1 core. Our application starts worker threads proportional to the amount of 16 vCPU expecting to make the best usage of parallelization. But the Application is actually getting 1/16 time of 16 vCPU's, causing degraded performance due to frequent Process Switching.

This can be mitigated by providing the application with the correct amount of cores using Kubernetes Downward API.

### Memory

Memory issues are not spared us either. For optimizing performance applications check the amount of memory available and decide to reserve more than needed. This can lead to an application quickly exceeding its memory limits, because you expected it to use lets say less then 200 MiB but it actually used twice or thrice that amount. 

Solutions:
* In the JVM you can limit the heap using the -Xmx option.
* In dotnet core there is no possibility to limit the memory usage, but you can optimize for less memory consumption by setting the following flag:
```xml
  <PropertyGroup> 
    <ServerGarbageCollection>false</ServerGarbageCollection>
  </PropertyGroup>
```

Make sure to inform yourself for the environments that your application uses, before going to prod.

## Summary

We covered the basics that we need to know about resource requests and limtis. 
* How they work together to optimize hardware usage.
* How the scheduler uses this information for scheduling pods.
* Memory limits will get your container killed (not a big deal as you should treat the app as disposable, but you need to take the steps to optimize performace).
* Basic information about limitting memory usage in JVM and dotnet core.

But there are more details that need to be looked up like: MostRequestedPriority, LeastRequestedPriority, Quality of Service classes, Request Quotas, Limit Ranges etc. Those help with further optimizing hardware usage.