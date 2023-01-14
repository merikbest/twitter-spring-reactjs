package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.service.TagClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_TAGS;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_TAGS)
public class TagApiController {

    private final TagClientService tagClientService;

    @GetMapping("/parse/{text}/{tweetId}")
    public void parseHashtagsInText(@PathVariable("text") String text, @PathVariable("tweetId") Long tweetId) {
        tagClientService.parseHashtagsInText(text, tweetId);
    }

    @DeleteMapping("/delete/{tweetId}")
    public void deleteTagsByTweetId(@PathVariable("tweetId") Long tweetId) {
        tagClientService.deleteTagsByTweetId(tweetId);
    }
}
