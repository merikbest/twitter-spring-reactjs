import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Link as MuiLink, Typography } from "@material-ui/core";
import classnames from "classnames";

import { ACCESSING_YOUR_TWITTER_DATA } from "../../../constants/url-constants";
import { FOLLOW_AND_UNFOLLOW_TOPICS } from "../../../constants/path-constants";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useTopicsStyles } from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";
import {
    selectFollowedTopicsItems,
    selectIsFollowedTopicsLoading,
    selectIsTopicsLoading,
    selectTopicsItems
} from "../../../store/ducks/topics/selectors";
import { fetchFollowedTopics, fetchTopicsByIds, resetTopicsState } from "../../../store/ducks/topics/actionCreators";
import TopicBlock from "../TopicBlock/TopicBlock";
import Spinner from "../../../components/Spinner/Spinner";
import TopicItem from "../TopicItem/TopicItem";

export const topicsIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];

const Followed = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const topicClasses = useTopicsStyles();
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);

    useEffect(() => {
        dispatch(fetchTopicsByIds({ topicsIds }));
        dispatch(fetchFollowedTopics());

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

    return (
        <>
            <Typography variant={"subtitle1"} component={"div"} className={globalClasses.itemInfoWrapper}>
                The Topics you follow are used to personalize the Tweets, events, and ads that you see, and show up
                publicly on your profile
            </Typography>
            <Divider />
            {isFollowedTopicsLoading ? (
                <Spinner />
            ) : (
                followedTopics.map((topic) => <TopicItem key={topic.id} topic={topic} />)
            )}
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Suggested Topics
                </Typography>
                <Typography variant={"subtitle2"} component={"div"}>
                    You'll see top Tweets about these right in your Home timeline
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                {isTopicsLoading ? (
                    <Spinner />
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={0} endTopicValue={5} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={5} endTopicValue={10} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={10} endTopicValue={15} isFollowedTopic />
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={10} endTopicValue={15} isFollowedTopic />
                            <TopicBlock topics={topics} startTopicValue={15} endTopicValue={20} isFollowedTopic />
                        </div>
                    </TopicsCarousel>
                )}
            </div>
            <Typography variant={"body1"} component={"div"} className={topicClasses.moreTopics}>
                More Topics
            </Typography>
            <Divider />
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
