import React, { FC, memo, ReactElement, useState } from "react";

import { ScheduleIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import ScheduleModal from "../ScheduleModal/ScheduleModal";
import UnsentTweetsModal from "../UnsentTweetsModal/UnsentTweetsModal";

interface ScheduleIconButtonProps {
    buttonName: string;
    disabled: boolean;
}

const ScheduleIconButton: FC<ScheduleIconButtonProps> = memo(({ buttonName, disabled, }): ReactElement => {
    const [visibleScheduleModal, setVisibleScheduleModal] = useState<boolean>(false);
    const [visibleUnsentTweetsModal, setVisibleUnsentTweetsModal] = useState<boolean>(false);

    const onOpenScheduleModal = (): void => {
        setVisibleScheduleModal(true);
    };

    const onCloseScheduleModal = (): void => {
        setVisibleScheduleModal(false);
    };

    const onOpenUnsentTweetsModal = (): void => {
        setVisibleUnsentTweetsModal(true);
        setVisibleScheduleModal(false);
    };

    const onCloseUnsentTweetsModal = (): void => {
        setVisibleScheduleModal(true);
        setVisibleUnsentTweetsModal(false);
    };

    return (
        <>
            {(buttonName !== "Reply") && (
                <>
                    <ActionIconButton
                        actionText={"Schedule"}
                        icon={ScheduleIcon}
                        onClick={onOpenScheduleModal}
                        size={"medium"}
                        disabled={disabled}
                    />
                    <ScheduleModal
                        visible={visibleScheduleModal}
                        onClose={onCloseScheduleModal}
                        onOpenUnsentTweetsModal={onOpenUnsentTweetsModal}
                    />
                    <UnsentTweetsModal
                        visible={visibleUnsentTweetsModal}
                        onClose={onCloseUnsentTweetsModal}
                    />
                </>
            )}
        </>
    );
});

export default ScheduleIconButton;
