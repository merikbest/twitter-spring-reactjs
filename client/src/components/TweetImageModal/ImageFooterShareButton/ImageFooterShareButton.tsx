import React, {FC, memo, ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {ShareIcon} from "../../../icons";

interface ImageFooterShareButtonProps {
    classes: ClassNameMap<string>
}

const ImageFooterShareButton: FC<ImageFooterShareButtonProps> = memo(({classes}): ReactElement => {
    return (
        <div className={classes.imageFooterIcon}>
            <IconButton size="small">
                <>{ShareIcon}</>
            </IconButton>
        </div>
    );
});

export default ImageFooterShareButton;
