import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { usePullIconButtonStyles } from "./PullIconButtonStyles";
import { PullIcon } from "../../../icons";
import { setOpenPoll } from "../../../store/ducks/addTweetForm/actionCreators";

interface PullIconButtonProps {
    buttonName: string;
    disabled: boolean;
}

const PullIconButton: FC<PullIconButtonProps> = memo(({ buttonName, disabled }): ReactElement => {
    const classes = usePullIconButtonStyles({ disabled });
    const dispatch = useDispatch();

    const onClickOpenPoll = (): void => {
        dispatch(setOpenPoll());
    };

    return (
        <>
            {(buttonName !== "Reply") && (
                <div className={classes.quoteImage}>
                    <ActionIconButton
                        actionText={"Poll"}
                        icon={PullIcon}
                        onClick={onClickOpenPoll}
                        disabled={disabled}
                        size={"medium"}
                    />
                </div>
            )}
        </>
    );
});

export default PullIconButton;
