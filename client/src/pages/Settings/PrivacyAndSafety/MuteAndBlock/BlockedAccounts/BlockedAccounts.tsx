import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Divider, Typography} from "@material-ui/core";

import {useBlockedAccountsStyles} from "./BlockedAccountsStyles";
import BlockedAccountItem from "./BlockedAccountItem/BlockedAccountItem";
import {fetchBlockedUsers, setUsers} from "../../../../../store/ducks/users/actionCreators";
import {selectUsers, selectUsersIsLoading, selectUsersLoadedSuccess} from "../../../../../store/ducks/users/selectors";
import Spinner from "../../../../../components/Spinner/Spinner";

const BlockedAccounts: FC = (): ReactElement => {
    const classes = useBlockedAccountsStyles();
    const dispatch = useDispatch();
    const blockedUsers = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);
    const isUsersLoadedSuccess = useSelector(selectUsersLoadedSuccess);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchBlockedUsers());

        return () => {
            dispatch(setUsers([]));
        };
    }, []);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    return (
        <>
            <div className={classes.tabs}>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                    <Tab className={classes.tab} label="All"/>
                    <Tab className={classes.tab} label="Imported"/>
                </Tabs>
            </div>
            <div className={classes.infoItemWrapper}>
                <Typography component={"div"} className={classes.text}>
                    When you block someone, that person won’t be able to follow or message you, and you won’t see
                    notifications from them. <a
                    href={"https://help.twitter.com/using-twitter/blocking-and-unblocking-accounts"}
                    target="_blank"
                    className={classes.link}>Learn more</a>
                </Typography>
            </div>
            <Divider/>
            {isUsersLoading ? (
                <Spinner/>
            ) : (
                (blockedUsers.length === 0 && isUsersLoadedSuccess) ? (
                    <div className={classes.blockedAccountsInfo}>
                        <Typography component={"div"} className={classes.title}>
                            {(activeTab === 0) ? (
                                "You aren’t blocking anyone"
                            ) : (
                                "You haven’t imported a list of accounts to block"
                            )}
                        </Typography>
                        <Typography component={"div"} className={classes.subTitle}>
                            {(activeTab === 0) ? (
                                <>
                                    When you block someone, that person won’t be able to follow or message you, and you
                                    won’t see notifications from them. <a
                                    href={"https://help.twitter.com/using-twitter/blocking-and-unblocking-accounts"}
                                    target="_blank"
                                    className={classes.link}>Learn more</a>
                                </>
                            ) : (
                                <>
                                    Find out how you can import a block list. <a
                                    href={"https://help.twitter.com/using-twitter/advanced-twitter-block-options"}
                                    target="_blank"
                                    className={classes.link}>Learn more</a>
                                </>
                            )}
                        </Typography>
                    </div>
                ) : (
                    blockedUsers.map((blockedUser) => <BlockedAccountItem blockedUser={blockedUser}/>)
                )
            )}
        </>
    );
};

export default BlockedAccounts;
