package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.BlockUserService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class BlockUserMapperTest extends AbstractAuthTest {

    @Autowired
    private BlockUserMapper basicMapper;

    @MockBean
    private BlockUserService blockUserService;

    @Test
    public void getBlockList() {
        Page<BlockedUserProjection> blockedUserProjections = UserServiceTestHelper.createBlockedUserProjections();
        when(blockUserService.getBlockList(pageable)).thenReturn(blockedUserProjections);
        basicMapper.getBlockList(pageable);
        verify(blockUserService, times(1)).getBlockList(pageable);
    }

    @Test
    public void processBlockList() {
        when(blockUserService.processBlockList(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(basicMapper.processBlockList(TestConstants.USER_ID));
        verify(blockUserService, times(1)).processBlockList(TestConstants.USER_ID);

    }
}
