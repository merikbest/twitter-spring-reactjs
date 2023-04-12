package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.request.TweetTextRequest;
import com.gmail.merikbest2015.service.TagClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_TAGS)
public class TagApiController {

    private final TagClientService tagClientService;

    @GetMapping(SEARCH_TEXT)
    public List<String> getTagsByText(@PathVariable("text") String text) {
        return tagClientService.getTagsByText(text);
    }

    @PostMapping(PARSE_TWEET_ID)
    public void parseHashtagsFromText(@PathVariable("tweetId") Long tweetId, @RequestBody TweetTextRequest request) {
        tagClientService.parseHashtagsFromText(tweetId, request.getText());
    }

    @DeleteMapping(DELETE_TWEET_ID)
    public void deleteTagsByTweetId(@PathVariable("tweetId") Long tweetId) {
        tagClientService.deleteTagsByTweetId(tweetId);
    }
}
