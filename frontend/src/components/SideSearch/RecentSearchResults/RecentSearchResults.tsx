import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";

import { useRecentSearchResultsStyles } from "./RecentSearchResultsStyles";
import { SEARCH_TERMS } from "../../../constants/common-constants";
import { fetchRecentSearchResult } from "../../../store/ducks/search/actionCreators";
import { selectLoadingSearchResult, selectRecentSearchResult } from "../../../store/ducks/search/selectors";
import UserSearchResult from "../UserSearchResult/UserSearchResult";
import Spinner from "../../Spinner/Spinner";
import { SearchTermsRequest } from "../../../store/ducks/search/contracts/state";
import TextSearchResult from "../TextSearchResult/TextSearchResult";

const RecentSearchResults: FC = (): ReactElement => {
    const classes = useRecentSearchResultsStyles();
    const dispatch = useDispatch();
    const isLoadingSearchResult = useSelector(selectLoadingSearchResult);
    const recentUsersSearchResult = useSelector(selectRecentSearchResult);
    const [localStorageItems, setLocalStorageItems] = useState<SearchTermsRequest>({ text: [], tags: [], users: [] });
    const localStorageItem = localStorage.getItem(SEARCH_TERMS);

    useEffect(() => {
        if (localStorageItem) {
            const searchTerms = JSON.parse(localStorageItem);
            dispatch(fetchRecentSearchResult(searchTerms));
            setLocalStorageItems((prevState) => ({...prevState, ...searchTerms}));
        }
    }, []);

    return (
        <>
            {isLoadingSearchResult ? (
                <Spinner />
            ) : (
                localStorageItem ? (
                    <>
                        <Typography className={classes.header} variant={"h5"} component={"div"}>
                            Recent
                        </Typography>
                        {localStorageItems.text.map((text, index) => <TextSearchResult key={index} text={text} />)}
                        {localStorageItems.tags.map((tag, index) => <TextSearchResult key={index} text={tag} />)}
                        {recentUsersSearchResult.map((user) => <UserSearchResult key={user.id} user={user} />)}
                    </>
                ) : (
                    <Typography className={classes.searchText} variant={"body1"} component={"div"}>
                        Try searching for people, topics, or keywords
                    </Typography>
                )
            )}
        </>
    );
};

export default RecentSearchResults;
