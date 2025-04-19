import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ImageAction from "../ImageAction/ImageAction";
import { ProfileIcon } from "../../../../icons";
import { useModalWindow } from "../../../../hook/useModalWindow";
import TagPeopleModal from "./TagPeopleModal/TagPeopleModal";
import { selectSelectedUsers } from "../../../../store/ducks/addTweetForm/selector";
import { getUsersInImageDefaultText, getUsersInImageTranslationKey } from "../../../../util/text-formatter";

const TagPeople: FC = (): ReactElement => {
    const users = useSelector(selectSelectedUsers);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ImageAction
                subtitle={t(getUsersInImageTranslationKey(users), {
                    user1: users[0]?.fullName,
                    user2: users[1]?.fullName,
                    usersSize: users?.length - 1,
                    defaultValue: getUsersInImageDefaultText(users)
                })}
                icon={ProfileIcon}
                onClick={onOpenModalWindow}
            />
            <TagPeopleModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </>
    );
};

export default TagPeople;
