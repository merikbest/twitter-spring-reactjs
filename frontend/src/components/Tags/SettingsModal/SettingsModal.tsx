import React, { ReactElement, useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Checkbox, Dialog, DialogContent, Divider, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../util/globalClasses";
import { useSettingsModalStyles } from "./SettingsModalStyles";
import CloseButton from "../../CloseButton/CloseButton";
import { SettingsIcon } from "../../../icons";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";

const SettingsModal = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSettingsModalStyles();
    const [checked1, setChecked1] = useState<boolean>(true);
    const [checked2, setChecked2] = useState<boolean>(true);
    const [visibleSettingsModal, setVisibleSettingsModal] = useState<boolean>(false);

    const onOpenSettingsModal = (): void => {
        setVisibleSettingsModal(true);
    };

    const onCloseSettingsModal = (): void => {
        setVisibleSettingsModal(false);
    };

    return (
        <>
            <ActionIconButton actionText={"Settings"} onClick={onOpenSettingsModal} icon={SettingsIcon} />
            <Dialog className={classes.dialog} open={visibleSettingsModal} onClose={onCloseSettingsModal}>
                <DialogTitle>
                    <CloseButton onClose={onCloseSettingsModal} />
                    Trends
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Location
                        </Typography>
                    </div>
                    <div className={globalClasses.itemInfoWrapper}>
                        <div className={globalClasses.infoItemCheckbox}>
                            <Typography variant={"body1"} component={"span"}>
                                Show content in this location
                            </Typography>
                            <Checkbox checked={checked1} onChange={() => setChecked1(prevState => !prevState)} />
                        </div>
                        <Typography variant={"subtitle2"} component={"div"}>
                            When this is on, you’ll see what’s happening around you right now.
                        </Typography>
                    </div>
                    <Divider />
                    <div className={globalClasses.itemInfoWrapper}>
                        <Typography variant={"h5"} component={"div"}>
                            Personalization
                        </Typography>
                    </div>
                    <div className={globalClasses.itemInfoWrapper}>
                        <div className={globalClasses.infoItemCheckbox}>
                            <Typography variant={"body1"} component={"span"}>
                                Trends for you
                            </Typography>
                            <Checkbox checked={checked2} onChange={() => setChecked2(prevState => !prevState)} />
                        </div>
                        <Typography variant={"subtitle2"} component={"div"}>
                            You can personalize trends based on your location and who you follow.
                        </Typography>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SettingsModal;