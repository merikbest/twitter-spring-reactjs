package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ListsOwnerMemberResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private String avatar;

    @JsonProperty("isMemberInList")
    private boolean isMemberInList;

    @JsonProperty("isPrivateProfile")
    private boolean privateProfile;
}
