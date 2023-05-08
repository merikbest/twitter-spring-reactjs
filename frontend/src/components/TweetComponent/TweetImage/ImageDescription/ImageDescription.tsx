import React, { FC, ReactElement } from "react";
import { Button, Popover, Typography } from "@material-ui/core";

import { useImageDescriptionStyles } from "./ImageDescriptionStyles";
import { usePopup } from "../../../../hook/usePopup";

interface ImageDescriptionProps {
    imageDescription: string;
}

const ImageDescription: FC<ImageDescriptionProps> = ({ imageDescription }): ReactElement => {
    const classes = useImageDescriptionStyles();
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    return (
        <>
            <div className={classes.altButton} onClick={handleOpenPopup}>
                ALT
            </div>
            <Popover
                id={popoverId}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
                classes={{ paper: classes.popover }}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
                <div className={classes.popoverContainer}>
                    <Typography variant={"h3"} component={"div"}>
                        Image description
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        {imageDescription}
                    </Typography>
                    <Button
                        onClick={handleClosePopup}
                        color="primary"
                        variant="outlined"
                        size="large"
                        fullWidth
                    >
                        Dismiss
                    </Button>
                </div>
            </Popover>
        </>
    );
};

export default ImageDescription;
