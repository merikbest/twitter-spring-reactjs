import React, {ReactElement, useState} from "react";
import {Divider, Typography} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import classnames from "classnames";

import {useGlobalStyles} from "../../../util/globalClasses";
import {useSuggestedStyles} from "./SuggestedStyles";
import SuggestedButton from "./SuggestedButton";
import {useTopicsStyles} from "../TopicsStyles";
import {ArrowIcon, ArrowNextIcon} from "../../../icons";
import TopicItem from "../TopicItem/TopicItem";

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
                <Carousel
                    NextIcon={ArrowNextIcon}
                    PrevIcon={ArrowIcon}
                    indicators={false}
                    autoPlay={false}
                    duration={0}
                >
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Elon Musk"}/>
                                <TopicItem topicName={"Technology"}/>
                                <TopicItem topicName={"Web development"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Entertainment"}/>
                                <TopicItem topicName={"Digital creators"}/>
                                <TopicItem topicName={"Funny Tweets"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Animal Crossing"}/>
                                <TopicItem topicName={"Minecraft"}/>
                                <TopicItem topicName={"MrBeast"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Animal Crossing"}/>
                                <TopicItem topicName={"Minecraft"}/>
                                <TopicItem topicName={"MrBeast"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"PewDiePie"}/>
                                <TopicItem topicName={"Science"}/>
                                <TopicItem topicName={"Cats"}/>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
            <Divider/>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Gaming
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                <Carousel
                    NextIcon={ArrowNextIcon}
                    PrevIcon={ArrowIcon}
                    indicators={false}
                    autoPlay={false}
                    duration={0}
                >
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Animal Crossing"}/>
                                <TopicItem topicName={"Minecraft"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"PewDiePie"}/>
                                <TopicItem topicName={"PlayStation 5"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Cyberpunk 2077"}/>
                                <TopicItem topicName={"The Sims"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Cyberpunk 2077"}/>
                                <TopicItem topicName={"The Sims"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Game development"}/>
                                <TopicItem topicName={"Among Us"}/>
                            </div>
                        </div>
                    </div>
                </Carousel>
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
                <Carousel
                    NextIcon={ArrowNextIcon}
                    PrevIcon={ArrowIcon}
                    indicators={false}
                    autoPlay={false}
                    duration={0}
                >
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Funny Tweets"}/>
                                <TopicItem topicName={"Viral Tweets"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Based on your searches"}/>
                                <TopicItem topicName={"Spaces You Might Like"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Popular images"}/>
                                <TopicItem topicName={"Popular videos"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Popular images"}/>
                                <TopicItem topicName={"Popular videos"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Days of celebration"}/>
                                <TopicItem topicName={"On this day"}/>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
            <Divider/>
        </>
    );
};

export default Suggested;
