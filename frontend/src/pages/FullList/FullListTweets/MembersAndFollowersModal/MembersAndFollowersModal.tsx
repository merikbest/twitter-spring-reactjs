import React, { FC, ReactElement } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ManageMembersItem
    from "../../EditListButton/EditListModal/ManageMembersModal/ManageMembersItem/ManageMembersItem";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyPageDescription from "../../../../components/EmptyPageDescription/EmptyPageDescription";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useMembersAndFollowersModal } from "./useMembersAndFollowersModal";

interface MembersAndFollowersModalProps {
    listId: number;
    listOwnerId: number;
    visible: boolean;
    modalInfo: {
        modalType: string,
        modalTitleKey: string,
        modalTitle: string,
        emptyPageTitleKey: string,
        emptyPageTitle: string,
        emptyPageDescriptionKey: string,
        emptyPageDescription: string
    };
    onClose: () => void;
}

const MembersAndFollowersModal: FC<MembersAndFollowersModalProps> = (
    {
        listId,
        listOwnerId,
        visible,
        modalInfo,
        onClose
    }
): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 577 });
    const { t } = useTranslation();
    const {
        users,
        isLoading,
        handleClick
    } = useMembersAndFollowersModal(listId, listOwnerId, visible, modalInfo.modalType);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} onClick={handleClick}>
            <DialogTitleComponent
                title={t(modalInfo.modalTitleKey, { defaultValue: modalInfo.modalTitle })}
                onClose={onClose}
            />
            <DialogContent className={globalClasses.dialogContent}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    (users.length !== 0) ? (
                        users.map((user) => (
                            <ManageMembersItem key={user.id} listId={listId} listOwnerId={listOwnerId} user={user} />
                        ))
                    ) : (
                        <EmptyPageDescription
                            title={t(modalInfo.emptyPageTitleKey, { defaultValue: modalInfo.emptyPageTitle })}
                            subtitle={t(modalInfo.emptyPageDescriptionKey, { defaultValue: modalInfo.emptyPageDescription })}
                        />
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MembersAndFollowersModal;
