import React, {ReactElement, useState} from "react";
import {Divider, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useGlobalStyles} from "../../../util/globalClasses";
import {useSuggestedStyles} from "./SuggestedStyles";
import SuggestedButton from "./SuggestedButton";
import {useTopicsStyles} from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";
import TopicsItem from "./TopicsItem/TopicsItem";

const Suggested = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSuggestedStyles();
    const topicClasses = useTopicsStyles();
    const [showMoreCategories, setShowMoreCategories] = useState(false);

    const onClickShowMoreCategories = () => {
        setShowMoreCategories(true);
    };

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Categories
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <SuggestedButton text={"Fashion & beauty"}/>
                <SuggestedButton text={"Outdoors"}/>
                <SuggestedButton text={"Arts & culture"}/>
                <SuggestedButton text={"Animation & comics"}/>
                <SuggestedButton text={"Business & finance"}/>
                <SuggestedButton text={"Food"}/>
                {showMoreCategories && (
                    <>
                        <SuggestedButton text={"Travel"}/>
                        <SuggestedButton text={"Entertainment"}/>
                        <SuggestedButton text={"Music"}/>
                        <SuggestedButton text={"Gaming"}/>
                        <SuggestedButton text={"Careers"}/>
                        <SuggestedButton text={"Sports"}/>
                    </>
                )}
            </div>
            {!showMoreCategories && (
                <Typography
                    className={classes.showMoreButton}
                    variant={"body1"}
                    component={"div"}
                    onClick={onClickShowMoreCategories}
                >
                    Show more
                </Typography>
            )}
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    For you
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                <TopicsCarousel>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Elon Musk"}/>
                                <TopicsItem topicName={"Technology"}/>
                                <TopicsItem topicName={"Web development"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Entertainment"}/>
                                <TopicsItem topicName={"Digital creators"}/>
                                <TopicsItem topicName={"Funny Tweets"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Animal Crossing"}/>
                                <TopicsItem topicName={"Minecraft"}/>
                                <TopicsItem topicName={"MrBeast"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"PewDiePie"}/>
                                <TopicsItem topicName={"Science"}/>
                                <TopicsItem topicName={"Cats"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"PewDiePie"}/>
                                <TopicsItem topicName={"Science"}/>
                                <TopicsItem topicName={"Cats"}/>
                            </div>
                        </div>
                    </div>
                </TopicsCarousel>
            </div>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Gaming
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                <TopicsCarousel>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Animal Crossing"}/>
                                <TopicsItem topicName={"Minecraft"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"PewDiePie"}/>
                                <TopicsItem topicName={"PlayStation 5"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Cyberpunk 2077"}/>
                                <TopicsItem topicName={"The Sims"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Game development"}/>
                                <TopicsItem topicName={"Among Us"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Game development"}/>
                                <TopicsItem topicName={"Among Us"}/>
                            </div>
                        </div>
                    </div>
                </TopicsCarousel>
            </div>
            <Typography variant={"body1"} component={"div"} className={topicClasses.moreTopics}>
                View all
            </Typography>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Only on Twitter
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                <TopicsCarousel>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Funny Tweets"}/>
                                <TopicsItem topicName={"Viral Tweets"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Based on your searches"}/>
                                <TopicsItem topicName={"Spaces You Might Like"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Popular images"}/>
                                <TopicsItem topicName={"Popular videos"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Days of celebration"}/>
                                <TopicsItem topicName={"On this day"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicsItem topicName={"Days of celebration"}/>
                                <TopicsItem topicName={"On this day"}/>
                            </div>
                        </div>
                    </div>
                </TopicsCarousel>
            </div>
            <Divider/>
        </>
    );
};

export default Suggested;
