package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.enums.BackgroundColorType;
import com.gmail.merikbest2015.enums.ColorSchemeType;
import lombok.Data;

@Data
public class SettingsRequest {
    private String username;
    private String email;
    private String countryCode;
    private Long phone;
    private String country;
    private String gender;
    private String language;
    private boolean mutedDirectMessages;
    private boolean privateProfile;
    private BackgroundColorType backgroundColor;
    private ColorSchemeType colorScheme;
}
