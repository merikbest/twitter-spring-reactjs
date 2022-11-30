import React, {FC, ReactElement} from "react";

import NotInterestedTopic from "./NotInterestedTopic/NotInterestedTopic";

interface NotInterestedProps {

}

const NotInterested: FC<NotInterestedProps> = ({}): ReactElement => {
    return (
        <div>
            <NotInterestedTopic topicName={"Funny Tweets"} category={"Only on Twitter"}/>
            <NotInterestedTopic topicName={"Cyberpunk 2077"} category={"Gaming"}/>
            <NotInterestedTopic topicName={"Cheese"} category={"Food"}/>
        </div>
    );
};

export default NotInterested;
