import React, { FC, memo, ReactElement } from "react";
import { IconButton } from "@material-ui/core";

import { CloseIcon } from "../../../icons";
import { useImageCloseButtonStyles } from "./ImageCloseButtonStyles";

interface ImageCloseButtonProps {
    onCloseModalWindow: () => void;
}

const ImageCloseButton: FC<ImageCloseButtonProps> = memo(({ onCloseModalWindow }): ReactElement => {
    const classes = useImageCloseButtonStyles();

    return (
        <div className={classes.imageModalClose}>
            <IconButton id={"closeModalWindow"} onClick={onCloseModalWindow} size="small">
                {CloseIcon}
            </IconButton>
        </div>
    );
});

export default ImageCloseButton;
