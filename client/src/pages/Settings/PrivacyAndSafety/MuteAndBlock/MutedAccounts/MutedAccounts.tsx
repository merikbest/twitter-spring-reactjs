import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Typography} from "@material-ui/core";

import {useMutedAccountsStyles} from "./MutedAccountsStyles";
import {fetchMutedUsers, setUsers} from "../../../../../store/ducks/users/actionCreators";
import {selectUsers, selectUsersIsLoading, selectUsersLoadedSuccess} from "../../../../../store/ducks/users/selectors";
import MutedAccountItem from "./MutedAccountItem/MutedAccountItem";
import Spinner from "../../../../../components/Spinner/Spinner";

const MutedAccounts: FC = (): ReactElement => {
    const classes = useMutedAccountsStyles();
    const dispatch = useDispatch();
    const mutedUsers = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);
    const isUsersLoadedSuccess = useSelector(selectUsersLoadedSuccess);

    useEffect(() => {
        dispatch(fetchMutedUsers());

        return () => {
            dispatch(setUsers([]));
        };
    }, []);

    return (
        <>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    Here’s everyone you muted. You can add or remove them from this list. <a
                    href={"https://help.twitter.com/using-twitter/twitter-mute"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <Divider/>
            {isUsersLoading ? (
                <Spinner/>
            ) : (
                (mutedUsers.length === 0 && isUsersLoadedSuccess) ? (
                    <div className={classes.mutedAccountsInfo}>
                        <Typography component={"div"} className={classes.title}>
                            You aren’t muting anyone
                        </Typography>
                        <Typography component={"div"} className={classes.subTitle}>
                            When you mute accounts, you won’t see their Tweets in your timeline. <a
                            href={"https://help.twitter.com/using-twitter/twitter-mute"}
                            target="_blank"
                            className={classes.link}>Learn more</a>
                        </Typography>
                    </div>
                ) : (
                    mutedUsers.map((mutedUser) => <MutedAccountItem mutedUser={mutedUser}/>)
                )
            )}
        </>
    );
};

export default MutedAccounts;
