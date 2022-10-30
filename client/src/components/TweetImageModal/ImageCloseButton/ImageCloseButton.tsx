import React, {FC, memo, ReactElement} from "react";
import {IconButton} from "@material-ui/core";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {CloseIcon} from "../../../icons";

interface ImageCloseButtonProps {
    classes: ClassNameMap<string>;
    onCloseModalWindow: () => void;
}

const ImageCloseButton: FC<ImageCloseButtonProps> = memo(({classes, onCloseModalWindow}): ReactElement => {
    return (
        <div className={classes.imageModalClose}>
            <IconButton id={"closeModalWindow"} onClick={onCloseModalWindow} size="small">
                {CloseIcon}
            </IconButton>
        </div>
    );
});

export default ImageCloseButton;
