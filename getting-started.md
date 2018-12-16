## Setting the application up

1. Initialize `helm` with your cluster.

`$ helm init`

2. Install Ingress controller by executing the command below:

```
$ helm install stable/nginx-ingress --name sa-routing --namespace kube-system --set rbac.create=false
```

3. From the root directory execute the following command:

```
$ kubectl apply -f ./resource-manifests/
```

4. Get the `External IP` of the Ingress controller:

```
$ kubectl get svc --all-namespaces -l component=controller
```

5. Open the external ip in the browser. 

Done!