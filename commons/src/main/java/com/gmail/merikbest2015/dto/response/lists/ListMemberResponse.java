package com.gmail.merikbest2015.dto.response.lists;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ListMemberResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private String avatar;

    @JsonProperty("isMemberInList")
    private boolean isMemberInList;

    @JsonProperty("isPrivateProfile")
    private boolean isPrivateProfile;

    public ListMemberResponse(boolean isMemberInList) {
        this.isMemberInList = isMemberInList;
    }
}
