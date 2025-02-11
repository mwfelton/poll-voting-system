package com.mwfelton.poll.voting.app.vote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/votes")
public class VoteController {

    @Autowired
    private VoteRepository voteRepository;

    @PostMapping("/createVote")
    public ResponseEntity<Vote> createVote(@RequestBody VoteRequest voteRequest) {
        System.out.println("Received vote for poll: " + voteRequest.getPollId() + " option: " + voteRequest.getOptionId());

        Vote vote = new Vote();
        vote.setPollId(voteRequest.getPollId());
        vote.setOptionId(voteRequest.getOptionId());

        Vote savedVote = voteRepository.save(vote);
        System.out.println("Vote saved with ID: " + savedVote.getId());
        return ResponseEntity.ok(savedVote);
    }


    @GetMapping("/results/{pollId}")
    public ResponseEntity<List<Vote>> getPollResults(@PathVariable UUID pollId) {
        List<Vote> votes = voteRepository.findByPollId(pollId);
        return ResponseEntity.ok(votes);
    }
}
