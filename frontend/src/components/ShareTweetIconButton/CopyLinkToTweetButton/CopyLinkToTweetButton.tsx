import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { CLIENT_URL } from "../../../constants/url-constants";
import { LinkIcon } from "../../../icons";
import { setOpenSnackBar } from "../../../store/ducks/actionSnackbar/actionCreators";

interface CopyLinkToTweetButtonProps {
    closeShareTweet: () => void;
}

const CopyLinkToTweetButton: FC<CopyLinkToTweetButtonProps> = ({ closeShareTweet }): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();

    const onCopyLinkToTweet = (): void => {
        dispatch(setOpenSnackBar("Copied to clipboard"));
        closeShareTweet();
    };

    return (
        <>
            <CopyToClipboard text={`${CLIENT_URL}${location.pathname}`}>
                <ListItem id={"copyLinkToTweet"} onClick={onCopyLinkToTweet}>
                    <>{LinkIcon}</>
                    <Typography variant={"body1"} component={"span"}>
                        Copy link to Tweet
                    </Typography>
                </ListItem>
            </CopyToClipboard>
        </>
    );
};

export default CopyLinkToTweetButton;
