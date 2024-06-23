package com.gmail.merikbest2015.controller.rest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-user-db.sql", "/sql-test/populate-user-db.sql"}, executionPhase = BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-user-db.sql"}, executionPhase = AFTER_TEST_METHOD)
public class CountryCodeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/user/country/codes - Get country codes")
    public void getCountryCodes() throws Exception {
        mockMvc.perform(get(UI_V1_USER + COUNTRY_CODES))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(10)))
                .andExpect(jsonPath("$[9].id").value(10L))
                .andExpect(jsonPath("$[9].countryCode").value("AM"))
                .andExpect(jsonPath("$[9].phoneCode").value("+374"))
                .andExpect(jsonPath("$[9].country").value("Armenia"));
    }
}
