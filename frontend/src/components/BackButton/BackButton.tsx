import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useBackButtonStyles } from "./BackButtonStyles";
import { ArrowIcon } from "../../icons";
import ActionIconButton from "../ActionIconButton/ActionIconButton";

const BackButton = (): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const handleClickButton = (): void => {
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <ActionIconButton
                actionText={t("BACK", { defaultValue: "Back" })}
                onClick={handleClickButton} icon={ArrowIcon}
            />
        </div>
    );
};

export default BackButton;
