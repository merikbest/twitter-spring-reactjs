import { useCallback, useState } from "react";
import { UserResponse } from "../types/user";

interface UseSelectUsers {
    selectedIndexes: number[],
    selectedUsers: UserResponse[],
    handleDelete: (selectedUser: UserResponse) => void
    handleListItemClick: (user: UserResponse) => void,
    resetSelectedUsers: () => void,
}

export const useSelectUsers = (): UseSelectUsers => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserResponse[]>([]);

    const handleDelete = useCallback((selectedUser: UserResponse): void => {
        setSelectedIndexes((indexes) => indexes.filter((index) => index !== selectedUser.id));
        setSelectedUsers((users) => users.filter((user) => user.id !== selectedUser.id));
    }, [selectedIndexes, selectedUsers]);

    const handleListItemClick = useCallback((user: UserResponse): void => {
        const currentIndex = selectedIndexes.indexOf(user?.id!);
        const newChecked = [...selectedIndexes];
        const newSelectedUsers = [...selectedUsers];

        if (currentIndex === -1) {
            newChecked.push(user?.id!);
            newSelectedUsers.push(user);
        } else {
            newChecked.splice(currentIndex, 1);
            newSelectedUsers.splice(currentIndex, 1);
        }
        setSelectedIndexes(newChecked);
        setSelectedUsers(newSelectedUsers);
    }, [selectedIndexes, selectedUsers]);

    const resetSelectedUsers = (): void => {
        setSelectedIndexes([]);
        setSelectedUsers([]);
    };

    return { selectedIndexes, selectedUsers, handleDelete, handleListItemClick, resetSelectedUsers };
};
