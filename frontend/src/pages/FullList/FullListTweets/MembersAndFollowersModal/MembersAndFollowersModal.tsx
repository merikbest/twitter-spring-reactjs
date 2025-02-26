import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import ManageMembersItem
    from "../../EditListButton/EditListModal/ManageMembersModal/ManageMembersItem/ManageMembersItem";
import {
    fetchListFollowers,
    fetchListMembers,
    resetListMembersState
} from "../../../../store/ducks/listMembers/actionCreators";
import { selectIsListMembersLoading, selectListMembersItems } from "../../../../store/ducks/listMembers/selectors";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyPageDescription from "../../../../components/EmptyPageDescription/EmptyPageDescription";
import DialogTitleComponent from "../../../../components/DialogTitleComponent/DialogTitleComponent";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { MembersAndFollowersEnum } from "../../../../hook/useListModal";

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
    const dispatch = useDispatch();
    const users = useSelector(selectListMembersItems);
    const isLoading = useSelector(selectIsListMembersLoading);
    const { t } = useTranslation();

    useEffect(() => {
        if (visible) {
            if (modalInfo.modalType === MembersAndFollowersEnum.MEMBERS) {
                dispatch(fetchListMembers({ listId, listOwnerId }));
            }
            if (modalInfo.modalType === MembersAndFollowersEnum.FOLLOWERS) {
                dispatch(fetchListFollowers({ listId, listOwnerId }));
            }
        }
        return () => {
            dispatch(resetListMembersState());
        };
    }, [visible]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

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
