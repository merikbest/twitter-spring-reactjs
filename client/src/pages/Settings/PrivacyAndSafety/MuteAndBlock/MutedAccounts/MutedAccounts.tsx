import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Link as MuiLink, Typography} from "@material-ui/core";

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
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Here’s everyone you muted. You can add or remove them from this list. `}
                    <MuiLink
                        href="https://help.twitter.com/using-twitter/twitter-mute"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider/>
            {isUsersLoading ? (
                <Spinner/>
            ) : (
                (mutedUsers.length === 0 && isUsersLoadedSuccess) ? (
                    <div className={classes.mutedAccountsInfo}>
                        <Typography variant={"h4"} component={"div"}>
                            You aren’t muting anyone
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {`When you mute accounts, you won’t see their Tweets in your timeline. `}
                            <MuiLink
                                href="https://help.twitter.com/using-twitter/twitter-mute"
                                variant="subtitle2"
                                target="_blank"
                                rel="noopener"
                            >
                                Learn more
                            </MuiLink>
                        </Typography>
                    </div>
                ) : (
                    mutedUsers.map((mutedUser) => <MutedAccountItem key={mutedUser.id} mutedUser={mutedUser}/>)
                )
            )}
        </>
    );
};

export default MutedAccounts;
