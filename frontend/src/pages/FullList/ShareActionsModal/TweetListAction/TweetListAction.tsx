import React, { FC, ReactElement } from "react";

import { TweetThisIcon } from "../../../../icons";
import ShareActionsItem from "../ShareActionsItem/ShareActionsItem";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TweetListModal from "./TweetListModal/TweetListModal";

const TweetListAction: FC = (): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ShareActionsItem title={"Tweet this"} icon={TweetThisIcon} onClick={onOpenModalWindow} />
            <TweetListModal visibleModalWindow={visibleModalWindow} onCloseModalWindow={onCloseModalWindow} />
        </>
    );
};

export default TweetListAction;
