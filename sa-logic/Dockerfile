FROM python:3.7-alpine
COPY sa /app
WORKDIR /app
RUN apk add --no-cache --virtual .build-deps gcc musl-dev \
     && pip3 install regex \
     && pip3 install -r requirements.txt \
     && python3 -m textblob.download_corpora
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["sentiment_analysis.py"]
