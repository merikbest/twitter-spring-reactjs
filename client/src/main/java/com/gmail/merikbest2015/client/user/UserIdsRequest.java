package com.gmail.merikbest2015.client.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserIdsRequest {
    private List<Long> usersIds;
}
