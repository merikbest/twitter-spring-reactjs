import React, { FC, ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { List } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useFollowingFollowersStyles } from "./FollowingFollowersStyles";
import { useGlobalStyles } from "../../util/globalClasses";
import FollowingFollowersHeader from "./FollowingFollowersHeader";
import Spinner from "../../components/Spinner/Spinner";
import EmptyFollowersDescription from "./EmptyFollowersDescription";
import UsersItem, { UserItemSize } from "../../components/UsersItem/UsersItem";
import { useFollowingFollowers } from "./useFollowingFollowers";

const FollowingFollowers: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useFollowingFollowersStyles();
    const { t } = useTranslation();
    const { users, isUsersLoading, activeTab, handleChangeTab } = useFollowingFollowers();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <FollowingFollowersHeader />
            <div className={globalClasses.contentWrapper}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label={t("FOLLOWING", { defaultValue: "Following" })} />
                        <Tab className={classes.tab} label={t("FOLLOWERS", { defaultValue: "Followers" })} />
                    </Tabs>
                </div>
                {(isUsersLoading && !users.length) ? (
                    <Spinner />
                ) : (
                    (!isUsersLoading && !users.length) ? (
                        <EmptyFollowersDescription activeTab={activeTab} />
                    ) : (
                        <List>
                            {users.map((user) => (
                                <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />
                            ))}
                        </List>
                    )
                )}
            </div>
        </Paper>
    );
};

export default FollowingFollowers;
