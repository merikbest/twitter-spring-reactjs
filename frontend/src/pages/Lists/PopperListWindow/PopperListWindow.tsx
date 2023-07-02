import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";

import { usePopperListWindowStyles } from "./PopperListWindowStyles";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { selectListDetailItemIsFollower, selectListDetailItemOwnerId } from "../../../store/ducks/listDetail/selectors";
import PopperListDescription from "./PopperListDescription/PopperListDescription";
import PopperListInteractionCount from "./PopperListInteractionCount/PopperListInteractionCount";
import PopperListWallpaper from "./PopperListWallpaper/PopperListWallpaper";
import FollowListButton from "./FollowListButton/FollowListButton";
import UnfollowListButton from "./UnfollowListButton/UnfollowListButton";

interface PopperListWindowProps {
    visible?: boolean;
}

const PopperListWindow: FC<PopperListWindowProps> = ({ visible }): ReactElement | null => {
    const classes = usePopperListWindowStyles();
    const myProfileId = useSelector(selectUserDataId);
    const listOwnerId = useSelector(selectListDetailItemOwnerId);
    const isFollower = useSelector(selectListDetailItemIsFollower);

    if (!visible) {
        return null;
    }

    return (
        <div id={"popperListWindow"} className={classes.popperListWindow}>
            <PopperListWallpaper />
            <div className={classes.popperListInfo}>
                <PopperListDescription />
                <PopperListInteractionCount />
                <div className={classes.buttonWrapper}>
                    {(myProfileId !== listOwnerId) && (
                        isFollower ? (
                            <UnfollowListButton />
                        ) : (
                            <FollowListButton />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default PopperListWindow;
