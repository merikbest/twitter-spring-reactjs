import { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { TOPICS_FOLLOWED, TOPICS_NOT_INTERESTED, TOPICS_SUGGESTED } from "../../constants/path-constants";

export const useTopics = () => {
    const history = useHistory();
    const { topics } = useParams<{ topics: string }>();
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        if (newValue === 0) history.push(TOPICS_FOLLOWED);
        if (newValue === 1) history.push(TOPICS_SUGGESTED);
        if (newValue === 2) history.push(TOPICS_NOT_INTERESTED);
        setActiveTab(newValue);
    };

    useEffect(() => {
        if (topics === "not_interested") {
            setActiveTab(2);
        } else if (topics === "suggested") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [topics]);

    return { activeTab, handleTabChange };
};
