package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.MutedUserResponse;
import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import com.gmail.merikbest2015.service.MuteUserService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class MuteUserMapperTest {

    @InjectMocks
    private MuteUserMapper muteUserMapper;

    @Mock
    private MuteUserService muteUserService;

    @Mock
    private BasicMapper basicMapper;

    private static final PageRequest pageable = PageRequest.of(0, 20);

    @Test
    public void getMutedList() {
        Page<MutedUserProjection> mutedUserProjections = UserServiceTestHelper.createMutedUserProjections();
        HeaderResponse<MutedUserResponse> headerResponse = new HeaderResponse<>(
                List.of(new MutedUserResponse(), new MutedUserResponse()), new HttpHeaders());
        when(muteUserService.getMutedList(pageable)).thenReturn(mutedUserProjections);
        when(basicMapper.getHeaderResponse(mutedUserProjections, MutedUserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, muteUserMapper.getMutedList(pageable));
        verify(muteUserService, times(1)).getMutedList(pageable);
    }

    @Test
    public void processMutedList() {
        when(muteUserService.processMutedList(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(muteUserMapper.processMutedList(TestConstants.USER_ID));
        verify(muteUserService, times(1)).processMutedList(TestConstants.USER_ID);
    }
}
