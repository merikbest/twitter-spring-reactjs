import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {MainSearchTextField} from "../SearchTextField/MainSearchTextField";
import {InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import {useDispatch} from "react-redux";
import {fetchTweetsByTag} from "../../store/ducks/tweets/actionCreators";
import {RouteComponentProps} from "react-router-dom";
import {BackButton} from "../BackButton/BackButton";

const Search: FC<RouteComponentProps<{ tag: string }>> = ({match}) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };

    useEffect(() => {
        dispatch(fetchTweetsByTag(match.params.tag))
    }, [match.params.tag]);

    return (
        <div>
            <BackButton/>
            <MainSearchTextField
                variant="outlined"
                placeholder="Search Twitter"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
            <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
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
