FROM python:3.6.6-alpine
RUN apk update
RUN apk add musl-dev
RUN apk add --update gcc
COPY sa /app
WORKDIR /app
RUN pip3 install -r requirements.txt && \
    python3 -m textblob.download_corpora
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["sentiment_analysis.py"]
