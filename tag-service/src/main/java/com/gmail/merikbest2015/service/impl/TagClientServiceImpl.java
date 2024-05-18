package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.repository.TagRepository;
import com.gmail.merikbest2015.service.TagClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagClientServiceImpl implements TagClientService {

    private final TagRepository tagRepository;

    @Override
    public List<String> getTagsByText(String text) {
        return tagRepository.getTagsByText(text);
    }
}
