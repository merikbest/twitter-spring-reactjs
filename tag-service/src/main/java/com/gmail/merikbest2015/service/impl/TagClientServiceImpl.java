package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Tag;
import com.gmail.merikbest2015.model.TweetTag;
import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.repository.TweetTagRepository;
import com.gmail.merikbest2015.service.TagClientService;
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
public class TagClientServiceImpl implements TagClientService {

    private final TagRepository tagRepository;
    private final TweetTagRepository tweetTagRepository;

    @Override
    public List<String> getTagsByText(String text) {
        return tagRepository.getTagsByText(text);
    }

    @Override
    @Transactional
    public void parseHashtagsFromText(Long tweetId, String text) {
        Pattern pattern = Pattern.compile("(#\\w+)\\b");
        Matcher match = pattern.matcher(text);
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
    public void deleteTagsByTweetId(Long tweetId) {
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
