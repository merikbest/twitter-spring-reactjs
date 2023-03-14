import React, { memo, ReactElement, useState } from "react";
import { InputAdornment } from "@material-ui/core";

import { SearchIcon } from "../../../icons";
import { PeopleSearchInput } from "../PeopleSearchInput/PeopleSearchInput";

const SearchChatParticipant = memo((): ReactElement => {
    const [text, setText] = useState<string>("");

    return (
        <PeopleSearchInput
            placeholder="Explore for people and groups"
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
