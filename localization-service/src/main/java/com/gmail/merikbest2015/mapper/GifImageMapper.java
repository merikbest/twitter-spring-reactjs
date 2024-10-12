package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.GifImageResponse;
import com.gmail.merikbest2015.model.GifImage;
import com.gmail.merikbest2015.service.GifImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GifImageMapper {

    private final BasicMapper basicMapper;
    private final GifImageService gifImageService;

    public List<GifImageResponse> getGifImages() {
        List<GifImage> countryCodes = gifImageService.getGifImages();
        return basicMapper.convertToResponseList(countryCodes, GifImageResponse.class);
    }
}
