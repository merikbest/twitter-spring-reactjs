import React, { FC, memo, ReactElement } from "react";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ActionIconButton from "../../../ActionIconButton/ActionIconButton";
import { PlusIcon } from "../../../../icons";
import { usePollStyles } from "../PollStyles";

interface AddPollInputButtonProps {
    pollInputSize: number;
    addPollInput: () => void;
}

const AddPollInputButton: FC<AddPollInputButtonProps> = memo(({ pollInputSize, addPollInput }): ReactElement => {
    const classes = usePollStyles();
    const { t } = useTranslation();

    return (
        <Grid id="addPollChoiceButton" md={1} item>
            <div className={classes.addPollInputWrapper} style={{ minHeight: (pollInputSize === 0) ? 115 : 185 }}>
                <ActionIconButton
                    actionText={t("ADD", { defaultValue: "Add" })}
                    icon={PlusIcon}
                    onClick={addPollInput}
                />
            </div>
        </Grid>
    );
});

export default AddPollInputButton;
