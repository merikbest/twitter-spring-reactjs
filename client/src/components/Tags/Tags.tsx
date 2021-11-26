import React, {FC, ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {CircularProgress, List, ListItem, ListItemText, Paper, Typography, IconButton} from "@material-ui/core";

import {SettingsIcon} from "../../icons";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {Tag} from "../../store/ducks/tags/contracts/state";
import {useTagsStyles} from "./TagsStyles";
import Spinner from "../Spinner/Spinner";

const Tags: FC = (): ReactElement => {
    const classes = useTagsStyles();
    const tags = useSelector(selectTagsItems);
    const isTagsLoaded = useSelector(selectIsTagsLoading);

    return (
        <Paper className={classes.container}>
            <Paper className={classes.header} variant="outlined">
                <b>Trends for you</b>
                <IconButton color="primary">
                    <span>{SettingsIcon}</span>
                </IconButton>
            </Paper>
            {isTagsLoaded ? (
                <Spinner/>
            ) : (
                <List>
                    {tags.slice(0, 3).map((tag: Tag) => (
                        <Link to={{pathname: "/search", state: {tag: encodeURIComponent(tag.tagName)}}}>
                            <React.Fragment key={tag.id}>
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
                            </React.Fragment>
                        </Link>
                    ))}
                    <Link to={"/home/trends"}>
                        <ListItem className={classes.footer}>
                            Show more
                        </ListItem>
                    </Link>
                </List>
            )}
        </Paper>
    );
};

export default Tags;
