package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.BlockedUserResponse;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.service.BlockUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BlockUserMapper {

    private final BasicMapper basicMapper;
    private final BlockUserService blockUserService;

    public HeaderResponse<BlockedUserResponse> getBlockList(Pageable pageable) {
        Page<BlockedUserProjection> blockList = blockUserService.getBlockList(pageable);
        return basicMapper.getHeaderResponse(blockList, BlockedUserResponse.class);
    }

    public Boolean processBlockList(Long userId) {
        return blockUserService.processBlockList(userId);
    }
}
