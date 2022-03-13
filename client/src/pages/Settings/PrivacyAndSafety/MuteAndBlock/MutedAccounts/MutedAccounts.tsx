import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider, Link as MuiLink, Typography} from "@material-ui/core";
import MutedAccountItem from "./MutedAccountItem/MutedAccountItem";
import Spinner from "../../../../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../../../../util/globalClasses";
import {
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectMutedUsersItems
} from "../../../../../store/ducks/blockedAndMutedUsers/selectors";
import {
    fetchMutedUsers,
    resetBlockedAndMutedUsersState
} from "../../../../../store/ducks/blockedAndMutedUsers/actionCreators";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const MutedAccounts: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const mutedUsers = useSelector(selectMutedUsersItems);
    const isMutedUsersLoading = useSelector(selectIsBlockedAndMutedUsersLoading);
    const isMutedUsersLoaded = useSelector(selectIsBlockedAndMutedUsersLoaded);

    useEffect(() => {
        dispatch(fetchMutedUsers());

        return () => {
            dispatch(resetBlockedAndMutedUsersState());
        };
    }, []);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
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
            {isMutedUsersLoading ? (
                <Spinner/>
            ) : (
                (mutedUsers.length === 0 && isMutedUsersLoaded) ? (
                    <div className={globalClasses.infoText}>
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

export default withDocumentTitle(MutedAccounts);
