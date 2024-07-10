import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useDeletePhoneNumberButtonStyles } from "./DeletePhoneNumberButtonStyles";

const DeletePhoneNumberButton: FC = (): ReactElement => {
    const classes = useDeletePhoneNumberButtonStyles();

    return (
        <div className={classes.deletePhoneNumber}>
            <Typography variant={"body1"} component={"span"}>
                Delete phone number
            </Typography>
        </div>
    );
};

export default DeletePhoneNumberButton;
