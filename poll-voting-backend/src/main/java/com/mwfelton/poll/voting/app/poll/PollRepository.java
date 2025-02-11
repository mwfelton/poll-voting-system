package com.mwfelton.poll.voting.app.poll;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PollRepository extends JpaRepository<Poll, UUID> {
    List<Poll> findByQuestion(String question);
}
