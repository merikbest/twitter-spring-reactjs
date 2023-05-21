import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import TweetListComponent from "../../../components/TweetListComponent/TweetListComponent";
import { selectTweetList } from "../../../store/ducks/tweet/selectors";

const TweetList: FC = (): ReactElement => {
    const tweetList = useSelector(selectTweetList);

    return (
        <>
            {tweetList && <TweetListComponent tweetList={tweetList} />}
        </>
    );
};

export default TweetList;
