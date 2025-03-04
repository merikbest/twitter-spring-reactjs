import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { TweetThisIcon } from "../../../../icons";
import ShareActionsItem from "../ShareActionsItem/ShareActionsItem";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TweetListModal from "./TweetListModal/TweetListModal";

const TweetListAction: FC = (): ReactElement => {
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ShareActionsItem
                title={t("TWEET_THIS", { defaultValue: "Tweet this" })}
                icon={TweetThisIcon}
                onClick={onOpenModalWindow}
            />
            <TweetListModal visibleModalWindow={visibleModalWindow} onCloseModalWindow={onCloseModalWindow} />
        </>
    );
};

export default TweetListAction;
