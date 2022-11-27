import React, {ChangeEvent, ReactElement, useState} from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {useTopicsStyles} from "./TopicsStyles";
import {useGlobalStyles} from "../../util/globalClasses";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Button, ButtonGroup, Divider, IconButton, Typography} from "@material-ui/core";
import {CloseIcon, EditIcon, PlusIcon} from "../../icons";

const Topics = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useTopicsStyles();
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    return (
        <PageWrapper title={"Topics"}>
            <div className={classes.tabs}>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
                    <Tab label="Followed"/>
                    <Tab label="Suggested"/>
                    <Tab label="Not Interested"/>
                </Tabs>
            </div>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                The Topics you follow are used to personalize the Tweets, events, and ads that you see, and show up
                publicly on your profile
            </Typography>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Suggested Topics
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    You'll see top Tweets about these right in your Home timeline
                </Typography>
            </div>
            <div className={classes.topicItem}>
                <ButtonGroup variant="outlined">
                    <Button className={classes.topicItemTextInfo}>
                        <Typography variant={"h6"} component={"div"}>
                            Elon Musk
                        </Typography>
                        <>{PlusIcon}</>
                    </Button>
                    <Button className={classes.topicItemCloseButton}>
                        <Divider orientation="vertical" flexItem />
                        <>{CloseIcon}</>
                    </Button>
                </ButtonGroup>
            </div>
        </PageWrapper>
    );
};

export default Topics;
