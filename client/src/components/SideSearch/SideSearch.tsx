import React, {FormEvent} from 'react';
import {Redirect, Link, useHistory} from 'react-router-dom';
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import {SideSearchTextField} from "../SearchTextField/SideSearchTextField";

const SideSearch = () => {
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
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
        </form>
    );
};

export default SideSearch;
