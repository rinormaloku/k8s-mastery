FROM python:3.6.6-alpine
COPY sa/requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt && \
    python3 -m textblob.download_corpora
COPY sa .
EXPOSE 5000
ENTRYPOINT ["python3"]
CMD ["sentiment_analysis.py"]