import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, Typography } from "@material-ui/core";

import { useTrendsItemStyles } from "./TrendsItemStyles";
import { SEARCH } from "../../../constants/path-constants";
import { EditIcon } from "../../../icons";
import { TagResponse } from "../../../types/tag";

interface TrendsItemProps {
    tag: TagResponse;
}

const TrendsItem: FC<TrendsItemProps> = ({ tag }): ReactElement => {
    const classes = useTrendsItemStyles();

    return (
        <div className={classes.item}>
            <Link to={{ pathname: SEARCH, state: { tag: tag.tagName } }}>
                <ListItem>
                    <ListItemText
                        primary={tag.tagName}
                        secondary={
                            <Typography component="span" variant="body2" color="textSecondary">
                                {tag.tweetsQuantity} Tweets
                            </Typography>
                        }
                    />
                    <span>{EditIcon}</span>
                </ListItem>
            </Link>
        </div>
    );
};

export default TrendsItem;