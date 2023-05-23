import React, { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

import { LinkIcon } from "../../../../icons";
import ShareActionsItem from "../ShareActionsItem/ShareActionsItem";
import { setOpenSnackBar } from "../../../../store/ducks/actionSnackbar/actionCreators";
import { CLIENT_URL } from "../../../../constants/url-constants";

interface CopyListLinkActionProps {
    onClickClose: () => void;
}

const CopyListLinkAction: FC<CopyListLinkActionProps> = ({ onClickClose }): ReactElement => {
    const dispatch = useDispatch();
    const location = useLocation();

    const onCopyLinkToList = (): void => {
        dispatch(setOpenSnackBar("Copied to clipboard"));
        onClickClose();
    };

    return (
        <CopyToClipboard text={`${CLIENT_URL}${location.pathname}`}>
            <ShareActionsItem title={"Copy link to List"} icon={LinkIcon} onClick={onCopyLinkToList} />
        </CopyToClipboard>
    );
};

export default CopyListLinkAction;
