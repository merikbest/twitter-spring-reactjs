import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Paper, Typography} from "@material-ui/core";

import {useSuggestedListsStyles} from "./SuggestedListsStyles";
import BackButton from "../../components/BackButton/BackButton";
import {fetchLists} from "../../store/ducks/lists/actionCreators";
import {selectIsLoading, selectListsItems} from "../../store/ducks/lists/selectors";
import ListsItem from "../Lists/ListsItem/ListsItem";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";

const SuggestedLists: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSuggestedListsStyles();
    const dispatch = useDispatch();
    const lists = useSelector(selectListsItems);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchLists());
    }, []);

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={globalClasses.pageHeader} variant="outlined">
                <BackButton/>
                <Typography variant="h5" component={"div"}>
                    Suggested Lists
                </Typography>
            </Paper>
            <Paper className={classes.content} variant="outlined">
                <img
                    className={classes.contentImage}
                    src="https://ton.twimg.com/onboarding/channels/discovery-v2.png"
                    alt="contentImage"
                />
                <div className={classes.infoWrapper}>
                    <Typography variant={"h3"} component={"div"} className={classes.infoTitle}>
                        Choose your Lists
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        When you follow a List, you'll be able to quickly keep up with the experts on what you care
                        about most.
                    </Typography>
                </div>
            </Paper>
            <Typography variant={"h5"} component={"div"} className={globalClasses.itemInfoWrapper}>
                Discover new Lists
            </Typography>
            {isLoading ? (
                <Spinner/>
            ) : (
                lists.map((list) => <ListsItem key={list.id} item={list}/>)
            )}
        </Paper>
    );
};

export default SuggestedLists;
