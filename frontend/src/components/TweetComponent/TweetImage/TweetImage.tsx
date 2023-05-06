import React, { FC, memo, ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Popover, Typography } from "@material-ui/core";

import { MODAL } from "../../../constants/path-constants";
import { useTweetImageStyles } from "./TweetImageStyles";
import { usePopup } from "../../../hook/usePopup";
import { TaggedUserResponse } from "../../../types/user";
import { getUsersInImage } from "../../../util/text-formatter";

interface TweetImageProps {
    tweetId?: number;
    imageSrc?: string;
    imageDescription?: string;
    taggedImageUsers?: TaggedUserResponse[];
}

const TweetImage: FC<TweetImageProps> = memo((
    {
        tweetId,
        imageSrc,
        imageDescription,
        taggedImageUsers
    }
): ReactElement => {
    const classes = useTweetImageStyles();
    const location = useLocation();
    const isModal = location.pathname.includes(MODAL);
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    return (
        <div id={"tweetImage"} className={classes.image}>
            <Link to={{ pathname: `${MODAL}/${tweetId}`, state: { background: location } }}>
                <img className={isModal ? "small" : ""} src={imageSrc} alt={imageSrc} />
            </Link>
            {imageDescription && (
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
            )}
            {(taggedImageUsers && taggedImageUsers.length !== 0) && (
                <Typography className={classes.taggedImageUsers} variant={"subtitle2"} component={"span"}>
                    {getUsersInImage(taggedImageUsers)}
                </Typography>
            )}
        </div>
    );
});

export default TweetImage;
