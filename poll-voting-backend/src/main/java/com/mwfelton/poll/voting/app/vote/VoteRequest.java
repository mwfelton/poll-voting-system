package com.mwfelton.poll.voting.app.vote;

import java.util.UUID;

public class VoteRequest {
    private UUID pollId;
    private UUID optionId;

    // Getters and Setters
    public UUID getPollId() {
        return pollId;
    }

    public void setPollId(UUID pollId) {
        this.pollId = pollId;
    }

    public UUID getOptionId() {
        return optionId;
    }

    public void setOptionId(UUID optionId) {
        this.optionId = optionId;
    }
}

