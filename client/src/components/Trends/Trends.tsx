import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, List, ListItem, ListItemText, Typography} from "@material-ui/core";

import {useTrendsStyles} from "./TrendsStyles";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {fetchTrends} from "../../store/ducks/tags/actionCreators";
import {Link} from "react-router-dom";
import {EditIcon} from "../../icons";

const Trends = () => {
    const classes = useTrendsStyles();
    const dispatch = useDispatch();
    const isTrendsLoaded = useSelector(selectIsTagsLoading);
    const trends = useSelector(selectTagsItems);

    useEffect(() => {
        dispatch(fetchTrends());
    }, []);

    return (
        <div>
            {isTrendsLoaded ? (
                <div className={classes.loading}>
                    <CircularProgress/>
                </div>
            ) : (
                <List style={{padding: 0}}>
                    {trends.map(item => (
                        <div className={classes.item} key={item.id}>
                            <Link to={{pathname: "/search", state: {tag: encodeURIComponent(item.tagName)}}}>
                                <ListItem>
                                    <ListItemText
                                        primary={item.tagName}
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                {item.tweetsQuantity} Tweets
                                            </Typography>
                                        }
                                    />
                                    <span>{EditIcon}</span>
                                </ListItem>
                            </Link>
                        </div>
                    ))}
                </List>)
            }
        </div>
    );
};

export default Trends;
