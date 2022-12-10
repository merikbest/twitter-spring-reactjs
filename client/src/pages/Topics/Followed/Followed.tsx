import React, {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Divider, Link as MuiLink, Typography} from "@material-ui/core";
import classnames from "classnames";

import {ACCESSING_YOUR_TWITTER_DATA} from "../../../util/url";
import {FOLLOW_AND_UNFOLLOW_TOPICS} from "../../../util/pathConstants";
import {useGlobalStyles} from "../../../util/globalClasses";
import {useTopicsStyles} from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";
import {selectIsTopicsLoading} from "../../../store/ducks/topics/selectors";
import {fetchTopics, resetTopicsState} from "../../../store/ducks/topics/actionCreators";
import FollowedTopicBlock from "./FollowedTopicBlock/FollowedTopicBlock";
import Spinner from "../../../components/Spinner/Spinner";

const Followed = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const topicClasses = useTopicsStyles();
    const dispatch = useDispatch();
    const isTopicsLoading = useSelector(selectIsTopicsLoading);

    useEffect(() => {
        dispatch(fetchTopics());

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
                {isTopicsLoading ? (
                    <Spinner/>
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <FollowedTopicBlock startTopicValue={0} endTopicValue={5}/>
                            <FollowedTopicBlock startTopicValue={5} endTopicValue={10}/>
                            <FollowedTopicBlock startTopicValue={10} endTopicValue={15}/>
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <FollowedTopicBlock startTopicValue={10} endTopicValue={15}/>
                            <FollowedTopicBlock startTopicValue={15} endTopicValue={20}/>
                        </div>
                    </TopicsCarousel>
                )}
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
