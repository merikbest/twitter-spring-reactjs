import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";

import { useRecentSearchResultsStyles } from "./RecentSearchResultsStyles";
import { SEARCH_TERMS } from "../../../constants/common-constants";
import { fetchRecentSearchResult, resetSearchResult } from "../../../store/ducks/search/actionCreators";
import {
    selectIsRecentSearchResultEmpty,
    selectLoadingSearchResult,
    selectRecentTagsSearchResult,
    selectRecentTextSearchResult,
    selectRecentUsersSearchResult
} from "../../../store/ducks/search/selectors";
import UserSearchResult from "../UserSearchResult/UserSearchResult";
import TextSearchResult from "../TextSearchResult/TextSearchResult";
import Spinner from "../../Spinner/Spinner";

const RecentSearchResults: FC = (): ReactElement => {
    const classes = useRecentSearchResultsStyles();
    const dispatch = useDispatch();
    const isLoadingSearchResult = useSelector(selectLoadingSearchResult);
    const recentTextSearchResult = useSelector(selectRecentTextSearchResult);
    const recentTagsSearchResult = useSelector(selectRecentTagsSearchResult);
    const recentUsersSearchResult = useSelector(selectRecentUsersSearchResult);
    const isRecentSearchResultEmpty = useSelector(selectIsRecentSearchResultEmpty);
    const localStorageItem = localStorage.getItem(SEARCH_TERMS);

    useEffect(() => {
        if (localStorageItem) {
            const searchTerms = JSON.parse(localStorageItem);
            dispatch(fetchRecentSearchResult(searchTerms));
        }
    }, []);

    const onClickClearSearchTerms = (): void => {
        dispatch(resetSearchResult());
        localStorage.removeItem(SEARCH_TERMS);
    };

    return (
        <>
            {isRecentSearchResultEmpty ? (
                <Typography className={classes.searchText} variant={"body1"} component={"div"}>
                    Try searching for people, topics, or keywords
                </Typography>
            ) : (
                isLoadingSearchResult ? (
                    <Spinner />
                ) : (
                    <>
                        <div>
                            <Typography className={classes.header} variant={"h5"} component={"div"}>
                                Recent
                            </Typography>
                            <Button
                                className={classes.clearButton}
                                onClick={onClickClearSearchTerms}
                                variant="text"
                                color="primary"
                            >
                                Clear all
                            </Button>
                        </div>
                        {recentTextSearchResult.map((text, index) => (
                            <TextSearchResult key={index} text={text} recentSearch />
                        ))}
                        {recentTagsSearchResult.map((tag, index) => (
                            <TextSearchResult key={index} text={tag} recentSearch />
                        ))}
                        {recentUsersSearchResult.map((user) => (
                            <UserSearchResult key={user.id} user={user} recentSearch />
                        ))}
                    </>
                )
            )}
        </>
    );
};

export default RecentSearchResults;
