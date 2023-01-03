package com.gmail.merikbest2015.client.tag;

import com.gmail.merikbest2015.commons.models.Tag;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient("tag-service")
public interface TagClient {

    @GetMapping("/api/v1/tags/{tweetId}")
    List<Tag> getTagsByTweetId(@PathVariable("tweetId") Long tweetId);

    @GetMapping("/api/v1/tags/search")
    Tag getTagByTagName(@RequestParam("tagName") String tagName);

    @PostMapping("/api/v1/tags/save")
    Tag saveTag(@RequestBody Tag tag);

    @DeleteMapping("/api/v1/tags/delete")
    void deleteTag(@RequestBody Tag tag);
}
