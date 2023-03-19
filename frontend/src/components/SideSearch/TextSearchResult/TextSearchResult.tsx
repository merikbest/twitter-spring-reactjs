import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { SearchIcon } from "../../../icons";
import { useTextSearchResultStyles } from "./TextSearchResultStyles";
import { SEARCH } from "../../../constants/path-constants";
import { addToLocalStorage } from "../addToLocalStorage";
import RemoveSearchResultButton from "../RemoveSearchResultButton/RemoveSearchResultButton";

interface TextSearchResultProps {
    text: string;
    tweetCount?: number;
    recentSearch?: boolean;
}

const TextSearchResult: FC<TextSearchResultProps> = memo(({ text, tweetCount, recentSearch }): ReactElement => {
    const classes = useTextSearchResultStyles();
    const history = useHistory();

    const onClickSearchResult = (): void => {
        const isHashTag = Array.from(text)[0] === "#";
        addToLocalStorage(isHashTag ? "tags" : "text", text);
        history.push({
            pathname: SEARCH,
            state: isHashTag ? { tag: text } : { text: encodeURIComponent(text) }
        });
    };

    return (
        <ListItem className={classes.searchTextResult} onClick={onClickSearchResult}>
            <span className={classes.searchIcon}>
                {SearchIcon}
            </span>
            <div>
                <Typography variant={"h6"} component={"div"}>
                    {text}
                </Typography>
                {tweetCount && (
                    <Typography variant={"subtitle1"} component={"div"}>
                        {tweetCount} Tweets
                    </Typography>
                )}
            </div>
            {recentSearch && <RemoveSearchResultButton stateItem={Array.from(text)[0] === "#" ? "tags" : "text"} item={text} />}
        </ListItem>
    );
});

export default TextSearchResult;
