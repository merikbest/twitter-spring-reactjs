package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.repository.CountryCodeRepository;
import com.gmail.merikbest2015.repository.GifImageRepository;
import com.gmail.merikbest2015.repository.LanguageRepository;
import com.gmail.merikbest2015.repository.WallpaperRepository;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public abstract class AbstractServiceTest {

    @MockBean
    CountryCodeRepository countryCodeRepository;

    @MockBean
    GifImageRepository gifImageRepository;

    @MockBean
    LanguageRepository languageRepository;

    @MockBean
    WallpaperRepository wallpaperRepository;
}
