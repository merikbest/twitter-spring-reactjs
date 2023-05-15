import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";

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

interface MembersAndFollowersModalProps {
    listId: number;
    listOwnerId: number;
    visible: boolean;
    title: string;
    onClose: () => void;
}

const MembersAndFollowersModal: FC<MembersAndFollowersModalProps> = (
    {
        listId,
        listOwnerId,
        visible,
        title,
        onClose
    }
): ReactElement | null => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 577 });
    const dispatch = useDispatch();
    const users = useSelector(selectListMembersItems);
    const isLoading = useSelector(selectIsListMembersLoading);

    useEffect(() => {
        if (visible) {
            if (title === "List members") {
                dispatch(fetchListMembers({ listId, listOwnerId }));
            } else {
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
            <DialogTitleComponent title={title} onClose={onClose} />
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
                            title={(title === "List members") ? (
                                "There isn’t anyone in this List"
                            ) : (
                                "There aren’t any followers of this List"
                            )}
                            subtitle={(title === "List members") ? (
                                "When people get added, they’ll show up here."
                            ) : (
                                "When people follow, they’ll show up here."
                            )}
                        />
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MembersAndFollowersModal;
