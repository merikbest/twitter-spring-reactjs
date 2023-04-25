import React, { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useSideMenuHomeItemStyles } from "./SideMenuHomeItemStyles";
import SideMenuItem from "../SideMenuItem/SideMenuItem";
import { LoadingStatus } from "../../../types/common";
import { selectLoadingState } from "../../../store/ducks/tweets/selectors";

interface SideMenuHomeItemProps {
    title: string;
    path: string;
    icon: JSX.Element;
    filledIcon: JSX.Element;
}

const SideMenuHomeItem: FC<SideMenuHomeItemProps> = ({ title, path, icon, filledIcon }): ReactElement => {
    const classes = useSideMenuHomeItemStyles();
    const loadingStatus = useSelector(selectLoadingState);
    const [visibleHomeNotification, setVisibleHomeNotification] = useState<boolean>(false);

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            setVisibleHomeNotification(true);
        } else {
            setVisibleHomeNotification(false);
        }
    }, [loadingStatus]);

    return (
        <SideMenuItem
            title={title}
            path={path}
            icon={icon}
            filledIcon={filledIcon}
        >
            {visibleHomeNotification && <span id={"homeNotification"} className={classes.homeNotification} />}
        </SideMenuItem>
    );
};

export default SideMenuHomeItem;
