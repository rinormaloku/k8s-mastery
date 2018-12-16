## Kubernetes Volumes

To demonstrate Kubernetes Volumes in this branch we added a new service the SA-Feedback. For newcomers to Kubernetes or that want to understand this Microservice application please read up in: [Learn kuberntes in under 3 hours: A detailed guide to Orchestrating Containers](https://medium.freecodecamp.org/learn-kubernetes-in-under-3-hours-a-detailed-guide-to-orchestrating-containers-114ff420e882)

### The SA-Feedback service

Stores users feedback if the Sentiment Analysis was correct or not in a SQLite database. In a real app it would be used to train the Sentiment Analysis model, in our case we use it as an opportunity to showcase **Kubernetes Volumes**.

#### Setting up the service

**Prerequisite:** install `dotnet core 2.1` 

To run the app execute the command below (from the directory of sa-feedback)

```
$ dotnet run
```

For additional information follow the README in [SA-Frontend directory](sa-feedback\README.md)

## Setting up the entire application in Kubernetes

Follow the instructions in the (getting started)[./getting-started.md] guide. 