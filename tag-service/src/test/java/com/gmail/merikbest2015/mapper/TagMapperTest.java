package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.TagResponse;
import com.gmail.merikbest2015.model.Tag;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TagMapperTest {

    @Autowired
    private ModelMapper modelMapper;

    @Test
    public void convertToResponse() {
        Tag tag = new Tag();
        tag.setId(1L);
        tag.setTagName("Test_tag");
        tag.setTweetsQuantity(111L);

        TagResponse orderResponse = modelMapper.map(tag, TagResponse.class);
        assertEquals(tag.getId(), orderResponse.getId());
        assertEquals(tag.getTagName(), orderResponse.getTagName());
        assertEquals(tag.getTweetsQuantity(), orderResponse.getTweetsQuantity());
    }
}
