import React, { memo, ReactElement } from "react";
import { IconButton } from "@material-ui/core";

import { ShareIcon } from "../../../icons";
import { useImageFooterButtonStyles } from "../ImageFooterButtonStyles";

const ImageFooterShareButton = memo((): ReactElement => {
    const classes = useImageFooterButtonStyles();

    return (
        <div className={classes.imageFooterIcon}>
            <IconButton size="small">
                <>{ShareIcon}</>
            </IconButton>
        </div>
    );
});

export default ImageFooterShareButton;
