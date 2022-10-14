package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.QuoteTweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.HeaderResponse;

@Component
@RequiredArgsConstructor
public class BasicMapper {

    private final ModelMapper modelMapper;

    <T, S> S convertToEntity(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }

    <T, S> S convertToResponse(T data, Class<S> type) {
        return modelMapper.map(data, type);
    }

    <T, S> List<S> convertToResponseList(List<T> lists, Class<S> type) {
        return lists.stream()
                .map(list -> convertToResponse(list, type))
                .collect(Collectors.toList());
    }

    <T, S> HeaderResponse<S> getHeaderResponse(Page<T> pageableItems, Class<S> type) {
        List<S> responses = convertToResponseList(pageableItems.getContent(), type);
        return constructHeaderResponse(responses, pageableItems.getTotalPages());
    }

    HeaderResponse<TweetResponse> getTweetHeaderResponse(Page<TweetProjection> pageableItems) {
        List<TweetResponse> responses = convertToResponseList(pageableItems.getContent(), TweetResponse.class).stream()
                .peek(tweetResponse -> {
                    if (tweetResponse.getQuoteTweet() != null && tweetResponse.getQuoteTweet().isDeleted()) {
                        tweetResponse.setQuoteTweet(new QuoteTweetResponse(true));
                    }
                })
                .collect(Collectors.toList());
        return constructHeaderResponse(responses, pageableItems.getTotalPages());
    }

    <T, S> HeaderResponse<S> getHeaderResponse(List<T> items, Integer totalPages, Class<S> type) {
        List<S> responses = convertToResponseList(items, type);
        return constructHeaderResponse(responses, totalPages);
    }

    private <S> HeaderResponse<S> constructHeaderResponse(List<S> responses, Integer totalPages) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("page-total-count", String.valueOf(totalPages));
        return new HeaderResponse<S>(responses, responseHeaders);
    }
}
