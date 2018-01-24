## Packaging the application
` $ mvn install`

## Running the application
` $ java -jar sentiment-analysis-web-0.0.1-SNAPSHOT.jar --sa.logic.api.url=http://localhost:5000 ` 

## Building the container
` $ docker build -f Dockerfile -t $DOCKER_USER_ID/sentiment-analysis-web-app . `

## Running the container
``` 
$ docker run -d -p 8080:8080 $DOCKER_USER_ID/sentiment-analysis-web-app -e SA_LOGIC_API_URL='http://192.168.99.100:5000'  
```

## Pushing the container
` $ docker push $DOCKER_USER_ID/sentiment-analysis-web-app `


