import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {List, ListItem, ListItemText, Typography} from "@material-ui/core";

import {useTrendsStyles} from "./TrendsStyles";
import {selectIsTagsLoading, selectTagsItems} from "../../store/ducks/tags/selectors";
import {fetchTrends} from "../../store/ducks/tags/actionCreators";
import {EditIcon} from "../../icons";
import Spinner from "../../components/Spinner/Spinner";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Trends: FC = (): ReactElement => {
    const classes = useTrendsStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsTagsLoading);
    const trends = useSelector(selectTagsItems);

    useEffect(() => {
        dispatch(fetchTrends());
        window.scrollTo(0, 0);

    }, []);

    return (
        <div>
            {isLoading ? (
                <Spinner paddingTop={80}/>
            ) : (
                <List style={{paddingTop: 48,}}>
                    {trends.map(item => (
                        <div className={classes.item} key={item.id}>
                            <Link to={{pathname: "/search", state: {tag: item.tagName}}}>
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

export default withDocumentTitle(Trends);
