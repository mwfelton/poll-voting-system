package com.mwfelton.poll.voting.app.Poll;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<com.mwfelton.pollvotingapp.Poll.Poll, Long> {
}