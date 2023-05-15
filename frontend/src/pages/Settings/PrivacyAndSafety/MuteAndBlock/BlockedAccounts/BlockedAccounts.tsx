import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";

import BlockedAccountItem from "./BlockedAccountItem/BlockedAccountItem";
import Spinner from "../../../../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import {
    fetchBlockedUsers,
    resetBlockedAndMutedUsersState
} from "../../../../../store/ducks/blockedAndMutedUsers/actionCreators";
import {
    selectBlockedUsersItems,
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectUsersPagesCount
} from "../../../../../store/ducks/blockedAndMutedUsers/selectors";
import { withDocumentTitle } from "../../../../../hoc/withDocumentTitle";
import {
    ADVANCED_TWITTER_BLOCK_OPTIONS,
    BLOCKING_AND_UNBLOCKING_ACCOUNTS
} from "../../../../../constants/url-constants";
import InfiniteScrollWrapper from "../../../../../components/InfiniteScrollWrapper/InfiniteScrollWrapper";

const BlockedAccounts: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const dispatch = useDispatch();
    const blockedUsers = useSelector(selectBlockedUsersItems);
    const isBlockedUsersLoading = useSelector(selectIsBlockedAndMutedUsersLoading);
    const isBlockedUsersLoaded = useSelector(selectIsBlockedAndMutedUsersLoaded);
    const blockedUsersPagesCount = useSelector(selectUsersPagesCount);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        loadBlockedUsers(0);

        return () => {
            dispatch(resetBlockedAndMutedUsersState());
        };
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const loadBlockedUsers = (page: number): void => {
        dispatch(fetchBlockedUsers(page));
    };

    return (
        <InfiniteScrollWrapper
            dataLength={blockedUsers.length}
            pagesCount={blockedUsersPagesCount}
            loadItems={loadBlockedUsers}
        >
            <div className={globalClasses.tabs}>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                    <Tab className={globalClasses.tab} label="All" />
                    <Tab className={globalClasses.tab} label="Imported" />
                </Tabs>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`When you block someone, that person won’t be able to follow or message you, and you won’t see
                        notifications from them. `}
                    <MuiLink href={BLOCKING_AND_UNBLOCKING_ACCOUNTS} variant="subtitle2" target="_blank" rel="noopener">
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
            <Divider />
            {isBlockedUsersLoading && !blockedUsers.length ? (
                <Spinner />
            ) : (
                (isBlockedUsersLoaded && !blockedUsers.length) ? (
                    <div className={globalClasses.infoText}>
                        <Typography variant={"h4"} component={"div"}>
                            {(activeTab === 0) ? (
                                "You aren’t blocking anyone"
                            ) : (
                                "You haven’t imported a list of accounts to block"
                            )}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            {(activeTab === 0) ? (
                                <>
                                    {`When you block someone, that person won’t be able to follow or message you, and you
                                        won’t see notifications from them. `}
                                    <MuiLink href={BLOCKING_AND_UNBLOCKING_ACCOUNTS} variant="subtitle1" target="_blank"
                                             rel="noopener"
                                    >
                                        Learn more
                                    </MuiLink>
                                </>
                            ) : (
                                <>
                                    {`Find out how you can import a block list. `}
                                    <MuiLink href={ADVANCED_TWITTER_BLOCK_OPTIONS} variant="subtitle1" target="_blank"
                                             rel="noopener"
                                    >
                                        Learn more
                                    </MuiLink>
                                </>
                            )}
                        </Typography>
                    </div>
                ) : (
                    <>
                        {blockedUsers.map((blockedUser) => (
                            <BlockedAccountItem key={blockedUser.id} blockedUser={blockedUser} />
                        ))}
                        {isBlockedUsersLoading && <Spinner />}
                    </>
                )
            )}
        </InfiniteScrollWrapper>
    );
};

export default withDocumentTitle(BlockedAccounts)("Blocked accounts");
