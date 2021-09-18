import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps} from "react-router-dom";
import {Paper, Typography} from "@material-ui/core";

import {useListsMembershipsStyles} from "./ListsMembershipsStyles";
import {BackButton} from "../../../components/BackButton/BackButton";
import {fetchUserProfile} from "../../../store/ducks/userProfile/actionCreators";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";

const ListsMemberships: FC<RouteComponentProps<{ id: string }>> = ({match}): ReactElement => {
    const classes = useListsMembershipsStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userProfile = useSelector(selectUserProfile);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchUserProfile(match.params.id));
    }, [match.params.id]);

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">
                        Lists {(myProfile?.id === userProfile?.id) && ("you’re on")}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        @{userProfile?.username}
                    </Typography>
                </div>
            </Paper>
            <div className={classes.infoWrapper}>
                {(myProfile?.id === userProfile?.id) ? (
                    <>
                        <div className={classes.title}>You haven’t been added to any Lists yet</div>
                        <div className={classes.text}>When someone adds you to a List, it’ll show up here.</div>
                    </>
                ) : (
                    <>
                        <div className={classes.title}>@{userProfile?.username} hasn’t created any Lists</div>
                        <div className={classes.text}>When they do, they’ll show up here.</div>
                    </>
                )}
            </div>
        </Paper>
    );
};

export default ListsMemberships;
