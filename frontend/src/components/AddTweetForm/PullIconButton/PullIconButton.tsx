import React, { FC, memo, ReactElement } from "react";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { usePullIconButtonStyles } from "./PullIconButtonStyles";
import { PullIcon } from "../../../icons";

interface PullIconButtonProps {
    buttonName: string;
    onOpenPoll: () => void;
    disabled: boolean;
}

const PullIconButton: FC<PullIconButtonProps> = memo(({ buttonName, onOpenPoll, disabled }): ReactElement => {
    const classes = usePullIconButtonStyles({ disabled });

    return (
        <>
            {(buttonName !== "Reply") && (
                <div className={classes.quoteImage}>
                    <ActionIconButton
                        actionText={"Poll"}
                        icon={PullIcon}
                        onClick={onOpenPoll}
                        disabled={disabled}
                        size={"medium"}
                    />
                </div>
            )}
        </>
    );
});

export default PullIconButton;
