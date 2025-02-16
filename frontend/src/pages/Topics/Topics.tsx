import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { useTopicsStyles } from "./TopicsStyles";
import Followed from "./Followed/Followed";
import { TOPICS_FOLLOWED, TOPICS_NOT_INTERESTED, TOPICS_SUGGESTED } from "../../constants/path-constants";
import Suggested from "./Suggested/Suggested";
import NotInterested from "./NotInterested/NotInterested";

const Topics = (): ReactElement => {
    const classes = useTopicsStyles();
    const history = useHistory();
    const params = useParams<{ topics: string }>();
    const [activeTab, setActiveTab] = useState<number>(0);
    const { t } = useTranslation();

    useEffect(() => {
        if (params.topics === "not_interested") {
            setActiveTab(2);
        } else if (params.topics === "suggested") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [params]);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue === 2) {
            history.push(TOPICS_NOT_INTERESTED);
        } else if (newValue === 1) {
            history.push(TOPICS_SUGGESTED);
        } else {
            history.push(TOPICS_FOLLOWED);
        }
        setActiveTab(newValue);
    };

    return (
        <PageWrapper translationKey={"TOPICS"} defaultValue={"Topics"}>
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
