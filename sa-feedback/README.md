## Building the Docker Container

```
$ docker build -t $DOCKER_USER_ID/sentiment-analysis-feedback .
```

## Creating the database
As the migrations are already in the repository you need to create the database by executing the commands below:

```
$ mkdir Database
$ dotnet ef database update
```

If you want to make changes to the model, you need to create a new migration and re-execute the above command.
To create a new migration execute:

```
$ dotnet ef migrations add $MIGRATION_NAME
```

## Running the Docker Container

```
$ docker run -it -p 5000:80 --name feedback \
    -v ${PWD}/Database:/usr/database \
    -e DATABASE_DIR=/usr/database \
       rinormaloku/sentiment-analysis-feedback
```

Hint: In `cmd` replace ${PWD} with %cd% -> both of these represent the current directory.