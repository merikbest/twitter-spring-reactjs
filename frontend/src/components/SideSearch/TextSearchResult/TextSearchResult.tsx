import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { SearchIcon } from "../../../icons";
import { useTextSearchResultStyles } from "./TextSearchResultStyles";
import { SEARCH } from "../../../constants/path-constants";
import { addToLocalStorage } from "../addToLocalStorage";

interface TextSearchResultProps {
    text: string;
    tweetCount?: number;
}

const TextSearchResult: FC<TextSearchResultProps> = ({ text, tweetCount }): ReactElement => {
    const classes = useTextSearchResultStyles();
    const history = useHistory();

    const handleClickSearchResult = (): void => {
        const isHashTag = Array.from(text)[0] === "#";
        addToLocalStorage(isHashTag ? "tags" : "text", text);
        history.push({
            pathname: SEARCH,
            state: isHashTag ? { tag: text } : { text: encodeURIComponent(text) }
        });
    };

    return (
        <ListItem className={classes.searchTextResult} onClick={handleClickSearchResult}>
            <>{SearchIcon}</>
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
        </ListItem>
    );
};

export default TextSearchResult;
