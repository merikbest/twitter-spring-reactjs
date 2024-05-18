package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.model.TweetTag;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.repository.TweetTagRepository;
import com.gmail.merikbest2015.service.TagHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class TagHandlerServiceImpl implements TagHandlerService {

    private final TagRepository tagRepository;
    private final TweetTagRepository tweetTagRepository;

    @Override
    @Transactional
    public void parseHashtag(Long tweetId, String tweetText) {
        Pattern pattern = Pattern.compile("(#\\w+)\\b");
        Matcher match = pattern.matcher(tweetText);
        List<String> hashtags = new ArrayList<>();

        while (match.find()) {
            hashtags.add(match.group(1));
        }

        if (!hashtags.isEmpty()) {
            hashtags.forEach(hashtag -> {
                Optional<Tag> tag = tagRepository.findByTagName(hashtag);
                TweetTag tweetTag;

                if (tag.isPresent()) {
                    tweetTag = new TweetTag(tag.get().getId(), tweetId);
                    tagRepository.updateTagQuantity(tag.get().getId(), true);
                } else {
                    Tag newTag = tagRepository.save(new Tag(hashtag));
                    tweetTag = new TweetTag(newTag.getId(), tweetId);
                }
                tweetTagRepository.save(tweetTag);
            });
        }
    }

    @Override
    @Transactional
    public void deleteTag(Long tweetId) {
        List<Long> tagsIds = tweetTagRepository.getTagIdsByTweetId(tweetId);
        List<Tag> tags = tagRepository.getTagsByIds(tagsIds);
        tags.forEach(tag -> {
            if (tag.getTweetsQuantity() - 1 == 0) {
                tagRepository.delete(tag);
                tweetTagRepository.deleteTag(tag.getId());
            } else {
                tagRepository.updateTagQuantity(tag.getId(), false);
            }
        });
    }
}
