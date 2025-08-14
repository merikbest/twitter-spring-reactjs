import React, { ReactElement } from "react";
import { Route } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useTopicsStyles } from "./TopicsStyles";
import Followed from "./Followed";
import { TOPICS_FOLLOWED, TOPICS_NOT_INTERESTED, TOPICS_SUGGESTED } from "../../constants/path-constants";
import Suggested from "./Suggested";
import NotInterested from "./NotInterested";
import { useTopics } from "./useTopics";

const Topics = (): ReactElement => {
    const classes = useTopicsStyles();
    const { activeTab, handleTabChange } = useTopics();
    const { t } = useTranslation();

    return (
        <PageWrapper translationKey="TOPICS" defaultValue="Topics">
            <div className={classes.tabs}>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
                    <Tab label={t("FOLLOWED", { defaultValue: "Followed" })} />
                    <Tab label={t("SUGGESTED", { defaultValue: "Suggested" })} />
                    <Tab label={t("NOT_INTERESTED", { defaultValue: "Not Interested" })} />
                </Tabs>
            </div>
            <Route exact path={TOPICS_FOLLOWED} component={Followed} />
            <Route exact path={TOPICS_SUGGESTED} component={Suggested} />
            <Route exact path={TOPICS_NOT_INTERESTED} component={NotInterested} />
        </PageWrapper>
    );
};

export default Topics;
