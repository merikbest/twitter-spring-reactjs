import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import Spinner from "../../../components/Spinner/Spinner";
import { selectIsTweetsLoading, selectTweetsItems } from "../../../store/ducks/tweets/selectors";

const TweetsList = (): ReactElement => {
    const tweets = useSelector(selectTweetsItems);
    const isTweetsLoading = useSelector(selectIsTweetsLoading);

    return (
        <>
            {tweets.map((tweet) => <TweetComponent key={tweet.id} tweet={tweet} />)}
            {isTweetsLoading && <Spinner />}
        </>
    );
};

export default TweetsList;
