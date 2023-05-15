import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useGlobalStyles } from "../../../util/globalClasses";
import { useSuggestedStyles } from "./SuggestedStyles";
import SuggestedButton from "./SuggestedButton";
import { useTopicsStyles } from "../TopicsStyles";
import TopicsCarousel from "../TopicsCarousel/TopicsCarousel";
import {
    fetchTopicsByCategories,
    fetchTopicsByIds,
    resetTopicsState
} from "../../../store/ducks/topics/actionCreators";
import { topicsIds } from "../Followed/Followed";
import {
    selectIsTopicsByCategoriesLoading,
    selectIsTopicsLoading,
    selectTopicsByCategories,
    selectTopicsItems
} from "../../../store/ducks/topics/selectors";
import TopicBlock from "../TopicBlock/TopicBlock";
import Spinner from "../../../components/Spinner/Spinner";

const Suggested = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useSuggestedStyles();
    const topicClasses = useTopicsStyles();
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const topicsByCategories = useSelector(selectTopicsByCategories);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const isTopicsByCategoriesLoading = useSelector(selectIsTopicsByCategoriesLoading);
    const [showMoreCategories, setShowMoreCategories] = useState(false);

    useEffect(() => {
        dispatch(fetchTopicsByIds({ topicsIds }));
        dispatch(fetchTopicsByCategories({ categories: ["GAMING", "ONLY_ON_TWITTER"] }));

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

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
                <SuggestedButton text={"Fashion & beauty"} />
                <SuggestedButton text={"Outdoors"} />
                <SuggestedButton text={"Arts & culture"} />
                <SuggestedButton text={"Animation & comics"} />
                <SuggestedButton text={"Business & finance"} />
                <SuggestedButton text={"Food"} />
                {showMoreCategories && (
                    <>
                        <SuggestedButton text={"Travel"} />
                        <SuggestedButton text={"Entertainment"} />
                        <SuggestedButton text={"Music"} />
                        <SuggestedButton text={"Gaming"} />
                        <SuggestedButton text={"Careers"} />
                        <SuggestedButton text={"Sports"} />
                    </>
                )}
            </div>
            {!showMoreCategories && (
                <Typography
                    id={"clickShowMoreCategories"}
                    className={classes.showMoreButton}
                    variant={"body1"}
                    component={"div"}
                    onClick={onClickShowMoreCategories}
                >
                    Show more
                </Typography>
            )}
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    For you
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                {isTopicsLoading ? (
                    <Spinner />
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={0} endTopicValue={3} />
                            <TopicBlock topics={topics} startTopicValue={3} endTopicValue={6} />
                            <TopicBlock topics={topics} startTopicValue={6} endTopicValue={9} />
                            <TopicBlock topics={topics} startTopicValue={9} endTopicValue={12} />
                            <TopicBlock topics={topics} startTopicValue={12} endTopicValue={15} />
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topics} startTopicValue={12} endTopicValue={15} />
                            <TopicBlock topics={topics} startTopicValue={15} endTopicValue={18} />
                        </div>
                    </TopicsCarousel>
                )}
            </div>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Gaming
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                {isTopicsByCategoriesLoading ? (
                    <Spinner />
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topicsByCategories[0].topicsByCategories} startTopicValue={0}
                                        endTopicValue={2} />
                            <TopicBlock topics={topicsByCategories[0].topicsByCategories} startTopicValue={2}
                                        endTopicValue={4} />
                            <TopicBlock topics={topicsByCategories[0].topicsByCategories} startTopicValue={4}
                                        endTopicValue={6} />
                            <TopicBlock topics={topicsByCategories[0].topicsByCategories} startTopicValue={6}
                                        endTopicValue={8} />
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topicsByCategories[0].topicsByCategories} startTopicValue={6}
                                        endTopicValue={8} />
                        </div>
                    </TopicsCarousel>
                )}
            </div>
            <Typography variant={"body1"} component={"div"} className={topicClasses.moreTopics}>
                View all
            </Typography>
            <Divider />
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    Only on Twitter
                </Typography>
            </div>
            <div className={topicClasses.topicsItems}>
                {isTopicsByCategoriesLoading ? (
                    <Spinner />
                ) : (
                    <TopicsCarousel>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={0}
                                        endTopicValue={2} />
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={2}
                                        endTopicValue={4} />
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={4}
                                        endTopicValue={6} />
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={6}
                                        endTopicValue={8} />
                        </div>
                        <div className={classnames(globalClasses.itemInfoWrapper, topicClasses.topicsInfo)}>
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={4}
                                        endTopicValue={6} />
                            <TopicBlock topics={topicsByCategories[1].topicsByCategories} startTopicValue={6}
                                        endTopicValue={8} />
                        </div>
                    </TopicsCarousel>
                )}
            </div>
            <Divider />
        </>
    );
};

export default Suggested;
