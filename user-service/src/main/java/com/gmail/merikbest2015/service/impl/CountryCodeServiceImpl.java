package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.repository.CountryCodeRepository;
import com.gmail.merikbest2015.service.CountryCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryCodeServiceImpl implements CountryCodeService {

    private final CountryCodeRepository countryCodeRepository;

    @Override
    public List<CountryCode> getCountryCodes() {
        return countryCodeRepository.findAll();
    }
}
