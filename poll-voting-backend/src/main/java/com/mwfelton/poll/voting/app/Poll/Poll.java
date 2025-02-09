package com.mwfelton.poll.voting.app.Poll;

import jakarta.persistence.*;

@Entity
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

}
