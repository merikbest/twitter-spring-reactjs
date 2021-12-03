import React, {FC, FormEvent, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import {InputAdornment,} from "@material-ui/core";

import {SideSearchTextField} from "../SearchTextField/SideSearchTextField";
import {SearchIcon} from "../../icons";

const SideSearch: FC = (): ReactElement => {
    const history = useHistory();
    const [text, setText] = React.useState<string>("");

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        history.push({pathname: "/search", state: {text: encodeURIComponent(text)}});
    };

    return (
        <form onSubmit={handleClickSearch}>
            <SideSearchTextField
                variant="outlined"
                placeholder="Search Twitter"
                onChange={(event) => setText(event.target.value)}
                value={text}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {SearchIcon}
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
        </form>
    );
};

export default SideSearch;
