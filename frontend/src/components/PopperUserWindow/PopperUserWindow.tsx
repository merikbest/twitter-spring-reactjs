import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import { usePopperUserWindowStyles } from "./PopperUserWindowStyles";
import { selectUserDetailIsMyProfileBlocked } from "../../store/ducks/userDetail/selectors";
import PopperHeader from "./PopperHeader/PopperHeader";
import PopperInfo from "./PopperInfo/PopperInfo";
import PopperFooter from "./PopperFooter/PopperFooter";

interface PopperUserWindowProps {
    visible?: boolean;
    isTweetComponent?: boolean;
    isTweetImageModal?: boolean;
}

const PopperUserWindow: FC<PopperUserWindowProps> = (
    {
        visible,
        isTweetComponent,
        isTweetImageModal
    }
): ReactElement | null => {
    const classes = usePopperUserWindowStyles({ isTweetComponent });
    const isMyProfileBlocked = useSelector(selectUserDetailIsMyProfileBlocked);

    if (!visible) {
        return null;
    }

    return (
        <div
            className={classNames(
                classes.popperUserWindow,
                isTweetComponent && classes.tweetComponent,
                isTweetImageModal && classes.tweetImageModal
            )}
        >
            <PopperHeader />
            <PopperInfo />
            {!isMyProfileBlocked && <PopperFooter />}
        </div>
    );
};

export default PopperUserWindow;
