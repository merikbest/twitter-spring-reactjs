import React, {ReactElement, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {fetchFollowedTopicsByUserId, resetTopicsState} from "../../store/ducks/topics/actionCreators";
import {selectFollowedTopicsItems, selectIsFollowedTopicsLoading} from "../../store/ducks/topics/selectors";
import Spinner from "../../components/Spinner/Spinner";
import TopicItem from "../Topics/TopicItem/TopicItem";
import {useGlobalStyles} from "../../util/globalClasses";
import EmptyPageDescription from "../../components/EmptyPageDescription/EmptyPageDescription";

const UserTopics = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);
    const params = useParams<{ userId: string }>();

    useEffect(() => {
        dispatch(fetchFollowedTopicsByUserId(Number(params.userId)));

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

    return (
        <PageWrapper title={"Topics"}>
            <div className={globalClasses.contentWrapper}>
                {isFollowedTopicsLoading ? (
                    <Spinner/>
                ) : (
                    (!isFollowedTopicsLoading && !followedTopics.length) ? (
                        <EmptyPageDescription
                            title={"User isn’t following any Topics."}
                            subtitle={"When they do, it will be listed here."}
                        />
                    ) : (
                        followedTopics.map((topic) => <TopicItem key={topic.id} topic={topic}/>)
                    )
                )}
            </div>
        </PageWrapper>
    );
};

export default UserTopics;
