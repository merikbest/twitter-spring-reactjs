import React, { memo, ReactElement, useState } from "react";
import { InputAdornment } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { SearchIcon } from "../../../icons";
import { PeopleSearchInput } from "../PeopleSearchInput/PeopleSearchInput";

const SearchChatParticipant = memo((): ReactElement => {
    const { t } = useTranslation();
    const [text, setText] = useState<string>("");

    return (
        <PeopleSearchInput
            placeholder={t("SEARCH_CHAT_PARTICIPANT", { defaultValue: "Explore for people and groups" })}
            variant="outlined"
            onChange={(event) => setText(event.target.value)}
            value={text}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {SearchIcon}
                    </InputAdornment>
                )
            }}
        />
    );
});

export default SearchChatParticipant;
