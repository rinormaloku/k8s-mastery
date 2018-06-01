FROM ubuntu:latest
RUN apt-get update -y && \
    apt-get install -y python3-pip python-dev build-essential
COPY sa /app
WORKDIR /app
RUN pip3 install -r requirements.txt && \
    python3 -m textblob.download_corpora
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["sentiment_analysis.py"]
