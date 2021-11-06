import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Typography} from "@material-ui/core";

import {useBlockedAccountsStyles} from "./BlockedAccountsStyles";

const BlockedAccounts: FC = (): ReactElement => {
    const classes = useBlockedAccountsStyles();
    const [activeTab, setActiveTab] = useState<number>(0);

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
            <div className={classes.divider}/>
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
                            When you block someone, that person won’t be able to follow or message you, and you won’t
                            see notifications from them. <a
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
        </>
    );
};

export default BlockedAccounts;
