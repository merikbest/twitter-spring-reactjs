import React, { memo, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const CancelUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const { t } = useTranslation();
    const [btnText, setBtnText] = useState<string>(t("PENDING", { defaultValue: "Pending" }));

    const cancelFollow = (): void => {
        dispatch(processFollowRequest(userProfileId!));
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={cancelFollow}
            onMouseOver={() => setBtnText(t("CANCEL", { defaultValue: "Cancel" }))}
            onMouseLeave={() => setBtnText(t("PENDING", { defaultValue: "Pending" }))}
            color="primary"
            variant="outlined"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default CancelUserButton;
