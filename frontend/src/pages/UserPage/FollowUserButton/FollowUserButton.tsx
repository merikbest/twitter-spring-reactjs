import React, { memo, ReactElement } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useUserPageStyles } from "../UserPageStyles";
import { useFollowUserButton } from "./useFollowUserButton";

const FollowUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const { t } = useTranslation();
    const { handleFollow } = useFollowUserButton();

    return (
        <Button
            className={classes.outlinedButton}
            onClick={handleFollow}
            color="primary"
            variant="outlined"
            size="large"
        >
            {t("FOLLOW", { defaultValue: "Follow" })}
        </Button>
    );
});

export default FollowUserButton;