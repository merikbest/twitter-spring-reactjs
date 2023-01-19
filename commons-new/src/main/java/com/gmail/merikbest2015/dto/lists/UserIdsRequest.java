package com.gmail.merikbest2015.dto.lists;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserIdsRequest {
    private List<Long> userIds;
}
