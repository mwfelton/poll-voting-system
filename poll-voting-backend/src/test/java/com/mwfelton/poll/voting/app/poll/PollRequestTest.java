package com.mwfelton.poll.voting.app.poll;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PollRequestTest {

    @Test
    public void testPollRequest() {
        PollRequest pollRequest = new PollRequest();
        pollRequest.setQuestion("What's your favorite color?");

        PollRequest.PollOptionRequest option = new PollRequest.PollOptionRequest();
        option.setText("Red");

        pollRequest.setOptions(List.of(option));

        assertEquals("What's your favorite color?", pollRequest.getQuestion());
        assertEquals(1, pollRequest.getOptions().size());
        assertEquals("Red", pollRequest.getOptions().get(0).getText());
    }
}

