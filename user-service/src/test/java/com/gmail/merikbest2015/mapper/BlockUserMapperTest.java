package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.BlockedUserResponse;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.BlockUserService;
import com.gmail.merikbest2015.commons.util.TestConstants;
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
public class BlockUserMapperTest {

    @InjectMocks
    private BlockUserMapper blockUserMapper;

    @Mock
    private BlockUserService blockUserService;

    @Mock
    private BasicMapper basicMapper;

    private static final PageRequest pageable = PageRequest.of(0, 20);

    @Test
    public void getBlockList() {
        Page<BlockedUserProjection> blockedUserProjections = UserServiceTestHelper.createBlockedUserProjections();
        HeaderResponse<BlockedUserResponse> headerResponse = new HeaderResponse<>(
                List.of(new BlockedUserResponse(), new BlockedUserResponse()), new HttpHeaders());
        when(blockUserService.getBlockList(pageable)).thenReturn(blockedUserProjections);
        when(basicMapper.getHeaderResponse(blockedUserProjections, BlockedUserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, blockUserMapper.getBlockList(pageable));
        verify(blockUserService, times(1)).getBlockList(pageable);
    }

    @Test
    public void processBlockList() {
        when(blockUserService.processBlockList(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(blockUserMapper.processBlockList(TestConstants.USER_ID));
        verify(blockUserService, times(1)).processBlockList(TestConstants.USER_ID);
    }
}
