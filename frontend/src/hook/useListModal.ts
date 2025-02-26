import React, { useState } from "react";

export enum MembersAndFollowersEnum {
    MEMBERS = "MEMBERS",
    FOLLOWERS = "FOLLOWERS"
}

interface UseListModal {
    modalInfo: {
        modalType: string,
        modalTitleKey: string,
        modalTitle: string,
        emptyPageTitleKey: string,
        emptyPageTitle: string,
        emptyPageDescriptionKey: string,
        emptyPageDescription: string
    };
    onCloseModalWindow: () => void;
    onOpenModalWindow: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, modalType: MembersAndFollowersEnum) => void;
    visibleMembersAndFollowersModal: boolean;
}

const initModalInfoState = {
    modalType: "",
    modalTitleKey: "",
    modalTitle: "",
    emptyPageTitleKey: "",
    emptyPageTitle: "",
    emptyPageDescriptionKey: "",
    emptyPageDescription: ""
};

const membersModalInfoState = {
    modalType: MembersAndFollowersEnum.MEMBERS,
    modalTitleKey: "LIST_MEMBERS",
    modalTitle: "List members",
    emptyPageTitleKey: "EMPTY_MEMBERS_IN_LIST_TITLE",
    emptyPageTitle: "There isn’t anyone in this List",
    emptyPageDescriptionKey: "EMPTY_MEMBERS_IN_LIST_DESCRIPTION",
    emptyPageDescription: "When people get added, they’ll show up here."
};

const followersModalInfoState = {
    modalType: MembersAndFollowersEnum.FOLLOWERS,
    modalTitleKey: "LIST_FOLLOWERS",
    modalTitle: "List followers",
    emptyPageTitleKey: "EMPTY_FOLLOWERS_IN_LIST_TITLE",
    emptyPageTitle: "There aren’t any followers of this List",
    emptyPageDescriptionKey: "EMPTY_FOLLOWERS_IN_LIST_DESCRIPTION",
    emptyPageDescription: "When people follow, they’ll show up here."
};

export const useListModal = (): UseListModal => {
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalInfo, setModalInfo] = useState({ ...initModalInfoState });

    const onOpenModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, modalType: MembersAndFollowersEnum): void => {
        event.preventDefault();
        setVisibleMembersAndFollowersModal(true);
        if (modalType === MembersAndFollowersEnum.MEMBERS) {
            setModalInfo({ ...membersModalInfoState });
        }
        if (modalType === MembersAndFollowersEnum.FOLLOWERS) {
            setModalInfo({ ...followersModalInfoState });
        }
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalInfo({ ...initModalInfoState });
    };

    return { visibleMembersAndFollowersModal, modalInfo, onOpenModalWindow, onCloseModalWindow };
};
