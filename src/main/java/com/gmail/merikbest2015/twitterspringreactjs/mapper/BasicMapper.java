package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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
}
