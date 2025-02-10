package com.mwfelton.poll.voting.app.poll;

import java.util.List;

public class PollRequest {
    private String question;
    private List<PollOptionRequest> options;

    // Getters and Setters
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<PollOptionRequest> getOptions() {
        return options;
    }

    public void setOptions(List<PollOptionRequest> options) {
        this.options = options;
    }

    // Nested class to represent an option's text
    public static class PollOptionRequest {
        private String text;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}
