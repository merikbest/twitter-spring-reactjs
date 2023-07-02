import React, { FC, memo, ReactElement } from "react";
import { useDispatch } from "react-redux";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { usePollIconButtonStyles } from "./PollIconButtonStyles";
import { PullIcon } from "../../../icons";
import { setOpenPoll } from "../../../store/ducks/addTweetForm/actionCreators";

interface PollIconButtonProps {
    buttonName: string;
    disabled: boolean;
}

const PollIconButton: FC<PollIconButtonProps> = memo(({ buttonName, disabled }): ReactElement => {
    const classes = usePollIconButtonStyles({ disabled });
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

export default PollIconButton;
