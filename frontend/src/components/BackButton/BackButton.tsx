import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import { useBackButtonStyles } from "./BackButtonStyles";
import { ArrowIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

const BackButton = (): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();

    const handleClickButton = (): void => {
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <ActionIconButton actionText={"Back"} onClick={handleClickButton} icon={ArrowIcon} />
        </div>
    );
};

export default BackButton;
