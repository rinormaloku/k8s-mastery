## Packaging the application
` $ mvn install`

## Running the application
` java -jar sentiment-analysis-web-0.0.1-SNAPSHOT.jar --sentiment.api.url=http://192.168.99.100:5050/analyse/sentiment ` 

## Building the container
` $ docker build -f Dockerfile -t $DOCKER_USER_ID/sentiment-analysis-web-app . `

## Running the container
``` 
$ docker run -d -p 8080:8080 -e SENTIMENT_API_URL='http://192.168.99.100:5050/analyse/sentiment' $DOCKER_USER_ID/sentiment-
  analysis-web-app 
```

## Pushing the container
` $ docker push $DOCKER_USER_ID/sentiment-analysis-web-app `


