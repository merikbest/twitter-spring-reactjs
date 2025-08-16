import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUserDataMentionsCount } from "../../store/ducks/user/selectors";
import { NOTIFICATIONS, NOTIFICATIONS_MENTIONS } from "../../constants/path-constants";

export const useNotifications = () => {
    const history = useHistory();
    const userMentionsCount = useSelector(selectUserDataMentionsCount);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChangeTab = (event: ChangeEvent<{}>, activeTab: number): void => {
        const activeNotificationTab = activeTab === 0 ? NOTIFICATIONS : NOTIFICATIONS_MENTIONS;
        history.push(activeNotificationTab);
        setActiveTab(activeTab);
    };

    return { userMentionsCount, activeTab, handleChangeTab };
};
