package com.mwfelton.poll.voting.app.poll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/polls")
public class PollController {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private PollOptionRepository pollOptionRepository;

    @PostMapping("/createPoll")
    public ResponseEntity<Poll> createPoll(@RequestBody PollRequest pollRequest) {
        Poll poll = new Poll();
        poll.setQuestion(pollRequest.getQuestion());

        Poll savedPoll = pollRepository.save(poll);

        for (PollRequest.PollOptionRequest option : pollRequest.getOptions()) {
            PollOption pollOption = new PollOption();
            pollOption.setOptionText(option.getText());  // Set the text from PollOptionRequest
            pollOption.setPoll(savedPoll);
            pollOptionRepository.save(pollOption);
        }

        return ResponseEntity.ok(savedPoll);
    }

    @GetMapping
    public List<Poll> getAllPolls() {
        // This method returns all the polls in the database

        return pollRepository.findAll(); // pollRepository.findAll() retrieves all polls
    }

    @GetMapping("/search")
    public ResponseEntity<?> getPollByQuestion(@RequestParam String question) {
        List<Poll> polls = pollRepository.findByQuestion(question);
        if (polls.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No poll found with that question.");
        }
        return ResponseEntity.ok(polls);
    }
}