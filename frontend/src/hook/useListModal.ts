import React, { useState } from "react";

interface UseListModal {
    modalWindowTitle: string;
    onCloseModalWindow: () => void;
    onOpenModalWindow: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, title: string) => void;
    visibleMembersAndFollowersModal: boolean;
}

export const useListModal = (): UseListModal => {
    const [visibleMembersAndFollowersModal, setVisibleMembersAndFollowersModal] = useState<boolean>(false);
    const [modalWindowTitle, setModalWindowTitle] = useState<string>("");

    const onOpenModalWindow = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, title: string): void => {
        event.preventDefault();
        setVisibleMembersAndFollowersModal(true);
        setModalWindowTitle(`List ${title}`);
    };

    const onCloseModalWindow = (): void => {
        setVisibleMembersAndFollowersModal(false);
        setModalWindowTitle("");
    };

    return {
        visibleMembersAndFollowersModal,
        modalWindowTitle,
        onOpenModalWindow,
        onCloseModalWindow
    };
};
