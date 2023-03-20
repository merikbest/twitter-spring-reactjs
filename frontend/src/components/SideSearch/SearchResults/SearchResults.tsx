import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";

import {
    selectLoadingSearchResult,
    selectSearchedText,
    selectSearchTags,
    selectSearchTweetCount,
    selectSearchUsers
} from "../../../store/ducks/search/selectors";
import Spinner from "../../Spinner/Spinner";
import TextSearchResult from "../TextSearchResult/TextSearchResult";
import UserSearchResult from "../UserSearchResult/UserSearchResult";

const SearchResults: FC = (): ReactElement => {
    const isLoadingSearchResult = useSelector(selectLoadingSearchResult);
    const searchedText = useSelector(selectSearchedText);
    const tweetCount = useSelector(selectSearchTweetCount);
    const tags = useSelector(selectSearchTags);
    const users = useSelector(selectSearchUsers);

    return (
        <>
            {isLoadingSearchResult ? (
                <Spinner />
            ) : (
                <List>
                    {searchedText && <TextSearchResult text={searchedText} />}
                    {searchedText && tweetCount != 0 && <TextSearchResult text={searchedText} tweetCount={tweetCount} />}
                    {tags?.map((tag, index) => <TextSearchResult key={index} text={tag} />)}
                    {users?.map((user) => <UserSearchResult key={user.id} user={user} />)}
                </List>
            )}
        </>
    );
};

export default SearchResults;
