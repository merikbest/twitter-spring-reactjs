package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(value = {"/sql-test/clear-localization-db.sql", "/sql-test/populate-localization-db.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql-test/clear-localization-db.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class LanguageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("[200] GET /ui/v1/localization/languages - Get languages")
    public void getLanguages() throws Exception {
        mockMvc.perform(get(PathConstants.UI_V1_LOCALIZATION + PathConstants.LANGUAGES))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(10)))
                .andExpect(jsonPath("$[9].id").value(10L))
                .andExpect(jsonPath("$[9].language").value("Danish - dansk"));
    }
}
