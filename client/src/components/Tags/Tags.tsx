import React, {FC, ReactElement, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {CircularProgress, Divider, List, ListItem, ListItemText, Paper, Typography} from "@material-ui/core";

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {Tag} from "../../store/ducks/tags/contracts/state";


interface TagsProps {
    classes: ReturnType<typeof useHomeStyles>;
}

const Tags: FC<TagsProps> = ({classes}: TagsProps): ReactElement => {
    const tags = useSelector(selectTagsItems);
    const isTagsLoaded = useSelector(selectIsTagsLoading);

    return (
        <Paper className={classes.rightSideBlock}>
            <Paper className={classes.rightSideBlockHeader} variant="outlined">
                <b>Trends for you</b>
            </Paper>
            {isTagsLoaded ? (
                <div className={classes.tweetsCentred}>
                    <CircularProgress/>
                </div>
            ) : (
                <List>
                    {tags.map((tag: Tag) => (
                        <Link to={`/home/search/${encodeURIComponent(tag.tagName)}`}>
                            <React.Fragment key={tag.id}>
                                <ListItem className={classes.rightSideBlockItem}>
                                    <ListItemText
                                        primary={tag.tagName}
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                {tag.tweetsQuantity} Tweets
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider component="li"/>
                            </React.Fragment>
                        </Link>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default Tags;
