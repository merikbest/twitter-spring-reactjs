import React, { FC, ReactElement } from "react";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import PageHeaderWrapper from "../../components/PageHeaderWrapper/PageHeaderWrapper";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import PageHeaderTitle from "../../components/PageHeaderTitle/PageHeaderTitle";
import { useFollowersYouKnow } from "./useFollowersYouKnow";

const FollowersYouKnow: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { overallFollowers, isLoading, userProfile } = useFollowersYouKnow();

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <PageHeaderWrapper backButton>
                {!isLoading && (
                    <PageHeaderTitle
                        title={userProfile?.fullName!}
                        subtitle={`@${userProfile?.username}`}
                    />
                )}
            </PageHeaderWrapper>
            {(isLoading && (overallFollowers.length === 0)) ? (
                <Spinner paddingTop={150} />
            ) : (
                (!isLoading && (overallFollowers.length === 0)) ? (
                    <div className={globalClasses.contentWrapper}>
                        <EmptyPageDescription
                            title={t("EMPTY_FOLLOWERS_YOU_KNOW_TITLE", {
                                username: userProfile?.username,
                                defaultValue: `@${userProfile?.username} doesn’t have any followers you know yet`
                            })}
                            subtitle={t("EMPTY_FOLLOWERS_YOU_KNOW_DESCRIPTION", {
                                defaultValue: "When someone you know follows them, they’ll be listed here."
                            })}
                        />
                    </div>
                ) : (
                    <ConnectToUsers
                        translationKey="FOLLOWERS_YOU_KNOW"
                        defaultValue="Followers you know"
                        isUsersLoading={isLoading}
                        users={overallFollowers}
                    />
                )
            )}
        </Paper>
    );
};

export default FollowersYouKnow;
