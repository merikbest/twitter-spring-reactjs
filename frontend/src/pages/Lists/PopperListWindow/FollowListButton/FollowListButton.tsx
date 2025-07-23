import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { usePopperListWindowStyles } from "../PopperListWindowStyles";
import { useFollowListButton } from "./useFollowListButton";

const FollowListButton = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const { t } = useTranslation();
    const { handleFollow } = useFollowListButton();

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            variant="outlined"
            color="primary"
            size="small"
        >
            {t("FOLLOW", { defaultValue: "Follow" })}
        </Button>
    );
});

export default FollowListButton;
