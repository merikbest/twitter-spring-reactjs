package com.gmail.merikbest2015.client.tag;

import com.gmail.merikbest2015.commons.configuration.FeignConfiguration;
import com.gmail.merikbest2015.commons.models.Tag;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_TAGS;

@FeignClient(value = "tag-service", configuration = FeignConfiguration.class)
public interface TagClient {

    @GetMapping(API_V1_TAGS + "/{tweetId}")
    List<Tag> getTagsByTweetId(@PathVariable("tweetId") Long tweetId);

    @GetMapping(API_V1_TAGS + "/search")
    Tag getTagByTagName(@RequestParam("tagName") String tagName);

    @PostMapping(API_V1_TAGS + "/save")
    Tag saveTag(@RequestBody Tag tag);

    @DeleteMapping(API_V1_TAGS + "/delete")
    void deleteTag(@RequestBody Tag tag);
}
