import React, { ReactElement } from "react";
import { LockIcon as Icon } from "../../icons";

import { useLockIconStyles } from "./LockIconStyles";

const LockIcon = (): ReactElement => {
    const classes = useLockIconStyles();

    return <span className={classes.lockIcon}>{Icon}</span>;
};

export default LockIcon;
