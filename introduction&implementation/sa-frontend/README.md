## Starting the Web App Locally
` $ yarn start `

## Building the application
` $ yarn build `

## Building the container
` $ docker build -f Dockerfile -t $DOCKER_ID_USER/sentiment-analysis-frontend . `

## Running the container
` $ docker run -d -p 80:80 $DOCKER_ID_USER/sentiment-analysis-frontend `
