import React, {FC, ReactElement} from "react";
import {ListItem, Typography} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import {useLocation} from "react-router-dom";

import {CLIENT_URL} from "../../../util/url";
import {LinkIcon} from "../../../icons";
import {useSnackbar} from "../../../hook/useSnackbar";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";

interface CopyLinkToTweetButtonProps {
    closeShareTweet: () => void;
}

const CopyLinkToTweetButton: FC<CopyLinkToTweetButtonProps> = ({closeShareTweet}): ReactElement => {
    const location = useLocation();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();

    const onCopyLinkToTweet = (): void => {
        setOpenSnackBar!(true);
        setSnackBarMessage!("Copied to clipboard");
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
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </>
    );
};

export default CopyLinkToTweetButton;
