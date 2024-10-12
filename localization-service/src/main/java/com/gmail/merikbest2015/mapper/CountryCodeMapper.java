package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.CountryCodeResponse;
import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.service.CountryCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CountryCodeMapper {

    private final BasicMapper basicMapper;
    private final CountryCodeService countryCodeService;

    public List<CountryCodeResponse> getCountryCodes() {
        List<CountryCode> countryCodes = countryCodeService.getCountryCodes();
        return basicMapper.convertToResponseList(countryCodes, CountryCodeResponse.class);
    }
}
