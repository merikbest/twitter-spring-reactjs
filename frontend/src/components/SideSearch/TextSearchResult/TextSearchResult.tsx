import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { SearchIcon } from "../../../icons";
import { useTextSearchResultStyles } from "./TextSearchResultStyles";

interface TextSearchResultProps {
    text: string;
    tweetCount?: number;
}

const TextSearchResult: FC<TextSearchResultProps> = ({ text, tweetCount }): ReactElement => {
    const classes = useTextSearchResultStyles();
    const history = useHistory();

    return (
        <ListItem className={classes.searchTextResult}>
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
