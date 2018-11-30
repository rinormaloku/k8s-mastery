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
    -v ${PWD}/Database:/usr/database \
    -e DATABASE_DIR=/usr/database \
       $DOCKER_USER_ID/sentiment-analysis-feedback
```

Hint: In `cmd` replace ${PWD} with %cd% -> both of these represent the current directory.