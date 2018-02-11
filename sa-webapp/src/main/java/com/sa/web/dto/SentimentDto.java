package com.sa.web.dto;

public class SentimentDto {

    private String sentence;
    private float polarity;

    public SentimentDto() {
    }

    public SentimentDto(String sentence, float polarity) {
        this.sentence = sentence;
        this.polarity = polarity;
    }

    public String getSentence() {

        return sentence;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }

    public float getPolarity() {
        return polarity;
    }

    public void setPolarity(float polarity) {
        this.polarity = polarity;
    }

    @Override
    public String toString() {
        return "SentimentDto{" +
                "sentence='" + sentence + '\'' +
                ", polarity=" + polarity +
                '}';
    }
}
