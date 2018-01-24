package com.sa.web.dto;


public class SentenceDto {
    private String sentence;

    public SentenceDto() {
    }

    public String getSentence() {
        return sentence;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }

    @Override
    public String toString() {
        return sentence;
    }
}
