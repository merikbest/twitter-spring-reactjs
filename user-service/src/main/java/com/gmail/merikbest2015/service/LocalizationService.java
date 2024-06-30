package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.CountryCode;
import com.gmail.merikbest2015.model.Language;

import java.util.List;

public interface LocalizationService {
    List<CountryCode> getCountryCodes();
    List<Language> getLanguages();
}
