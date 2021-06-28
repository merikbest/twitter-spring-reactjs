import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";

import {MainSearchTextField} from "../SearchTextField/MainSearchTextField";
import {fetchTweetsByTag, fetchTweetsByText} from "../../store/ducks/tweets/actionCreators";
import {BackButton} from "../BackButton/BackButton";

const Search: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<{tag: string | undefined}>();
    const [text, setText] = React.useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (location.state?.tag !== undefined) {
            dispatch(fetchTweetsByTag(location.state?.tag));
            setText(decodeURIComponent(location.state?.tag));
        }
    }, [location]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const handleClickSearch = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchTweetsByText(encodeURIComponent(text)));
    };

    return (
        <div>
            <form onSubmit={handleClickSearch}>
            <BackButton/>
                <MainSearchTextField
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
                />
            </form>
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                <Tab style={{minWidth: "120px"}} label="Top"/>
                <Tab style={{minWidth: "120px"}} label="Latest"/>
                <Tab style={{minWidth: "120px"}} label="People"/>
                <Tab style={{minWidth: "120px"}} label="Photos"/>
                <Tab style={{minWidth: "120px"}} label="Videos"/>
            </Tabs>
        </div>
    );
};

export default Search;
