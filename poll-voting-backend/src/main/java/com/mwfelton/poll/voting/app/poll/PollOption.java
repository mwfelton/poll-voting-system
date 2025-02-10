package com.mwfelton.poll.voting.app.poll;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "poll_option")
public class PollOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the ID (UUID)
    private UUID id;

    @ManyToOne // Many options belong to one poll
    @JoinColumn(name = "poll_id")
    private Poll poll;

    private String optionText;

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
    }
}
