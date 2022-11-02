import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";

import {useMembersAndFollowersModalStyles} from "./MembersAndFollowersModalStyles";
import ManageMembersItem
    from "../../EditListButton/EditListModal/ManageMembersModal/ManageMembersItem/ManageMembersItem";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import {
    fetchListFollowers,
    fetchListMembers,
    resetListMembersState
} from "../../../../store/ducks/listMembers/actionCreators";
import {selectIsListMembersLoading, selectListMembersItems} from "../../../../store/ducks/listMembers/selectors";
import Spinner from "../../../../components/Spinner/Spinner";
import EmptyPageDescription from "../../../../components/EmptyPageDescription/EmptyPageDescription";

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
    const classes = useMembersAndFollowersModalStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectListMembersItems);
    const isLoading = useSelector(selectIsListMembersLoading);

    useEffect(() => {
        if (visible) {
            if (title === "List members") {
                dispatch(fetchListMembers({listId, listOwnerId}));
            } else {
                dispatch(fetchListFollowers({listId, listOwnerId}));
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
        <Dialog open={visible} onClose={onClose} onClick={handleClick} className={classes.dialog}>
            <DialogTitle>
                <CloseButton onClose={onClose}/>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                {isLoading ? (
                    <Spinner/>
                ) : (
                    (users.length !== 0) ? (
                        users.map((user) => (
                            <ManageMembersItem key={user.id} listId={listId} listOwnerId={listOwnerId} user={user}/>
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
