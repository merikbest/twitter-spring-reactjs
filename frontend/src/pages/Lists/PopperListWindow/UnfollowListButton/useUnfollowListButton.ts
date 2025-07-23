import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { unfollowList } from "../../../../store/ducks/lists/actionCreators";
import { selectListDetailItemId } from "../../../../store/ducks/listDetail/selectors";

export const useUnfollowListButton = () => {
    const dispatch = useDispatch();
    const listId = useSelector(selectListDetailItemId);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("FOLLOWING", { defaultValue: "Following" }));

    const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(unfollowList(listId!));
    };

    const handleMouseOver = (): void => {
        setBtnText(t("UNFOLLOW", { defaultValue: "Unfollow" }));
    };

    const handleMouseLeave = (): void => {
        setBtnText(t("FOLLOWING", { defaultValue: "Following" }));
    };

    return { btnText, handleUnfollow, handleMouseOver, handleMouseLeave };
};
