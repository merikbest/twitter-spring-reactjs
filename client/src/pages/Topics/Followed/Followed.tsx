import React, {ReactElement} from "react";
import {Divider, Link as MuiLink, Typography} from "@material-ui/core";
import classnames from "classnames";

import TopicItem from "../TopicItem/TopicItem";
import {ACCESSING_YOUR_TWITTER_DATA} from "../../../util/url";
import {FOLLOW_AND_UNFOLLOW_TOPICS} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";
import {useTopicsStyles} from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";

const Followed = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const topicClasses = useTopicsStyles();

    return (
        <>
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
            <div className={topicClasses.topicsItems}>
                <TopicsCarousel>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Elon Musk"}/>
                                <TopicItem topicName={"Technology"}/>
                                <TopicItem topicName={"Web development"}/>
                                <TopicItem topicName={"Entertainment"}/>
                                <TopicItem topicName={"Digital creators"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Funny Tweets"}/>
                                <TopicItem topicName={"Animal Crossing"}/>
                                <TopicItem topicName={"Minecraft"}/>
                                <TopicItem topicName={"MrBeast"}/>
                                <TopicItem topicName={"PewDiePie"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Science"}/>
                                <TopicItem topicName={"Cats"}/>
                                <TopicItem topicName={"Dogs"}/>
                                <TopicItem topicName={"Bitcoin"}/>
                                <TopicItem topicName={"Science"}/>
                            </div>
                        </div>
                    </div>
                    <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Science"}/>
                                <TopicItem topicName={"Cats"}/>
                                <TopicItem topicName={"Dogs"}/>
                                <TopicItem topicName={"Bitcoin"}/>
                                <TopicItem topicName={"Science"}/>
                            </div>
                        </div>
                        <div className={topicClasses.topicsBlock}>
                            <div className={topicClasses.topicsContainer}>
                                <TopicItem topicName={"Xbox"}/>
                                <TopicItem topicName={"Game"}/>
                                <TopicItem topicName={"Cyberpunk 2077"}/>
                                <TopicItem topicName={"Funny Tweets"}/>
                                <TopicItem topicName={"Viral Tweets"}/>
                            </div>
                        </div>
                    </div>
                </TopicsCarousel>
            </div>
            <Typography variant={"body1"} component={"div"} className={topicClasses.moreTopics}>
                More Topics
            </Typography>
            <Divider/>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                Topics that you follow are shown here. To see all the things that Twitter thinks you’re interested in,
                check out{" "}
                <MuiLink href={ACCESSING_YOUR_TWITTER_DATA} variant="subtitle1" target="_blank" rel="noopener">
                    Your Twitter data.
                </MuiLink>{" You can also "}
                <MuiLink href={FOLLOW_AND_UNFOLLOW_TOPICS} variant="subtitle1" target="_blank" rel="noopener">
                    learn more
                </MuiLink> about following Topics.
            </Typography>
        </>
    );
};

export default Followed;
