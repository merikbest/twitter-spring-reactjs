import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";

import MutedAccountItem from "./MutedAccountItem/MutedAccountItem";
import Spinner from "../../../../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import {
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectMutedUsersItems,
    selectUsersPagesCount
} from "../../../../../store/ducks/blockedAndMutedUsers/selectors";
import {
    fetchMutedUsers,
    resetBlockedAndMutedUsersState
} from "../../../../../store/ducks/blockedAndMutedUsers/actionCreators";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import { TWITTER_MUTE } from "../../../../../constants/url-constants";
import InfiniteScrollWrapper from "../../../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";

const MutedAccounts: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const mutedUsers = useSelector(selectMutedUsersItems);
    const isMutedUsersLoading = useSelector(selectIsBlockedAndMutedUsersLoading);
    const isMutedUsersLoaded = useSelector(selectIsBlockedAndMutedUsersLoaded);
    const mutedUsersPagesCount = useSelector(selectUsersPagesCount);

    useEffect(() => {
        loadMutedUsers(0);

        return () => {
            dispatch(resetBlockedAndMutedUsersState());
        };
    }, []);

    const loadMutedUsers = (page: number): void => {
        dispatch(fetchMutedUsers(page));
    };

    return (
        <InfiniteScrollWrapper
            dataLength={mutedUsers.length}
            pagesCount={mutedUsersPagesCount}
            loadItems={loadMutedUsers}
        >
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Here’s everyone you muted. You can add or remove them from this list. `}
                    <MuiLink href={TWITTER_MUTE} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            {(isMutedUsersLoading && !mutedUsers.length) ? (
                <Spinner />
            ) : (
                (isMutedUsersLoaded && !mutedUsers.length) ? (
                    <div className={globalClasses.infoText}>
                        <Typography variant={"h4"} component={"div"}>
                            You aren’t muting anyone
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {`When you mute accounts, you won’t see their Tweets in your timeline. `}
                            <MuiLink href={TWITTER_MUTE} variant="subtitle2" target="_blank" rel="noopener">
                                Learn more
                            </MuiLink>
                        </Typography>
                    </div>
                ) : (
                    <>
                        {mutedUsers.map((mutedUser) => (
                            <MutedAccountItem key={mutedUser.id} mutedUser={mutedUser} />
                        ))}
                        {isMutedUsersLoading && <Spinner />}
                    </>
                )
            )}
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(MutedAccounts)("Muted accounts");
