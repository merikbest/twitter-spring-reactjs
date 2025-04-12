import React, { FC, ReactElement } from "react";
import { Button, Popover, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useImageDescriptionStyles } from "./ImageDescriptionStyles";
import { usePopup } from "../../hook/usePopup";

interface ImageDescriptionProps {
    imageDescription: string;
    isFullTweet?: boolean;
}

const ImageDescription: FC<ImageDescriptionProps> = ({ imageDescription, isFullTweet }): ReactElement => {
    const classes = useImageDescriptionStyles({ isFullTweet });
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();
    const { t } = useTranslation();

    return (
        <>
            <div id="altImageDescription" className={classes.altButton} onClick={handleOpenPopup}>
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
                    <Typography variant="h3" component="div">
                        {t("IMAGE_DESCRIPTION", { defaultValue: "Image description" })}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        {imageDescription}
                    </Typography>
                    <Button
                        onClick={handleClosePopup}
                        color="primary"
                        variant="outlined"
                        size="large"
                        fullWidth
                    >
                        {t("DISMISS", { defaultValue: "Dismiss" })}
                    </Button>
                </div>
            </Popover>
        </>
    );
};

export default ImageDescription;
