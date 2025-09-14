import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Spinner from "../../components/Spinner/Spinner";
import TopicItem from "../Topics/TopicItem";
import { useGlobalStyles } from "../../util/globalClasses";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";
import { useUserTopics } from "./useUserTopics";

const UserTopics = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const { t } = useTranslation();
    const { followedTopics, isFollowedTopicsLoading } = useUserTopics();

    return (
        <PageWrapper translationKey="TOPICS" defaultValue="Topics">
            <div className={globalClasses.contentWrapper}>
                {(isFollowedTopicsLoading && !followedTopics.length) ? (
                    <Spinner />
                ) : (
                    (!isFollowedTopicsLoading && !followedTopics.length) ? (
                        <EmptyPageDescription
                            title={t("EMPTY_USER_TOPIC_TITLE", { defaultValue: "User isn’t following any Topics." })}
                            subtitle={t("EMPTY_USER_TOPIC_DESCRIPTION", { defaultValue: "When they do, it will be listed here." })}
                        />
                    ) : (
                        followedTopics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
                    )
                )}
            </div>
        </PageWrapper>
    );
};

export default UserTopics;
