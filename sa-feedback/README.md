## Setting up for local development
To start the application you need to have [dotnet core 2](https://dotnet.microsoft.com/download/dotnet-core/2.2) installed in your computer.
After that make sure that you are in the root folder of sa-feedback and execute the command:
```
$ dotnet run
```

This will create the database file in ./sa-feedback/Database/Feedback.db where feedbacks will be stored. The database directory is defined in the file ./sa-feedback/appsettings.json and can be overridden by the environment variable DATABASE_DIR.

#### Verify Local SA-Feedback 

Add a feedback by executing the command below:

```
$ curl -i -X POST http://localhost:5000/feedback \
              -H "Content-type: application/json" \
              -d "{'sentence': 'I like', 'polarity': 0, 'correct': false}"
```

And get the feedbacks by executing:

```
$ curl -X GET http://localhost:5000/feedback
```


## Building the Docker Container

```
$ docker build -t $DOCKER_USER_ID/sentiment-analysis-feedback .
```

## Creating the database

If you want to make changes to the model, you need to create a new migration and re-start the application.
To create a new migration execute:

```
$ dotnet ef migrations add $MIGRATION_NAME
```

## Building the Docker Container

```
$ docker build -t $DOCKER_USER_ID/sentiment-analysis-feedback .
```

## Running the Docker Container

```
$ docker run -it -p 5000:80 --name feedback \
    -v ${PWD}/Database:/usr/db \
    -e DATABASE_DIR=/usr/db \
       $DOCKER_USER_ID/sentiment-analysis-feedback
```

Hint: In `cmd` replace ${PWD} with %cd% -> both of these represent the current directory.