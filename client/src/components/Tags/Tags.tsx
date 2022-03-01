import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {List, ListItem, ListItemText, Paper, Typography, IconButton} from "@material-ui/core";

import {SettingsIcon} from "../../icons";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {useTagsStyles} from "./TagsStyles";
import Spinner from "../Spinner/Spinner";
import {TagResponse} from "../../store/types/tag";

const Tags: FC = (): ReactElement => {
    const classes = useTagsStyles();
    const tags = useSelector(selectTagsItems);
    const isTagsLoading = useSelector(selectIsTagsLoading);

    return (
        <Paper className={classes.container}>
            <Paper className={classes.header} variant="outlined">
                <Typography variant={"h5"} component={"div"}>
                    Trends for you
                </Typography>
                <IconButton color="primary">
                    <>{SettingsIcon}</>
                </IconButton>
            </Paper>
            {isTagsLoading ? (
                <Spinner/>
            ) : (
                <List>
                    {tags.slice(0, 3).map((tag: TagResponse) => (
                        <Link key={tag.id} to={{pathname: "/search", state: {tag: encodeURIComponent(tag.tagName)}}}>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    primary={tag.tagName}
                                    secondary={
                                        <Typography component="span" variant="body2" color="textSecondary">
                                            {tag.tweetsQuantity} Tweets
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    ))}
                    <Link to={"/home/trends"}>
                        <ListItem className={classes.footer}>
                            <Typography variant={"body1"} component={"span"}>
                                Show more
                            </Typography>
                        </ListItem>
                    </Link>
                </List>
            )}
        </Paper>
    );
};

export default Tags;
