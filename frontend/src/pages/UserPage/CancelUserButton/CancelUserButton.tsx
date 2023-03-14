import React, { memo, ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";

import { processFollowRequest } from "../../../store/ducks/user/actionCreators";
import { selectUserProfileId } from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

const CancelUserButton = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const dispatch = useDispatch();
    const userProfileId = useSelector(selectUserProfileId);
    const [btnText, setBtnText] = useState<string>("Pending");

    const cancelFollow = (): void => {
        dispatch(processFollowRequest(userProfileId!));
    };

    return (
        <Button
            className={classes.outlinedButton}
            onClick={cancelFollow}
            onMouseOver={() => setBtnText("Cancel")}
            onMouseLeave={() => setBtnText("Pending")}
            color="primary"
            variant="outlined"
            size="large"
        >
            {btnText}
        </Button>
    );
});

export default CancelUserButton;
