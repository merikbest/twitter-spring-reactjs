import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogContent, DialogTitle, List, ListItem} from "@material-ui/core";

import {useListsModalStyles} from "./ListsModalStyles";
import {selectUserListsItems} from "../../store/ducks/lists/selectors";
import {addUserToLists, fetchUserLists} from "../../store/ducks/lists/actionCreators";
import {CheckIcon} from "../../icons";
import {Lists} from "../../store/ducks/lists/contracts/state";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {User} from "../../store/ducks/user/contracts/state";
import CloseButton from "../CloseButton/CloseButton";

interface ListsModalProps {
    tweet?: Tweet;
    user?: User;
    visible?: boolean;
    onClose: () => void;
}

const ListsModal: FC<ListsModalProps> = ({tweet, user, visible, onClose}): ReactElement | null => {
    const classes = useListsModalStyles();
    const dispatch = useDispatch();
    const userLists = useSelector(selectUserListsItems);
    const params = useParams<{ listId: string }>();

    const [checkedListsIndexes, setCheckedListsIndexes] = useState<number[]>([]);
    const [lists, setLists] = useState<Lists[]>([]);

    useEffect(() => {
        if (visible) {
            dispatch(fetchUserLists());
        }
    }, [visible]);

    useEffect(() => {
        const set = new Set([...checkedListsIndexes]);

        userLists.forEach((list, index) => {
            let currentIndex = list.members.findIndex((listUser) => listUser.id === user!.id);

            if (currentIndex !== -1) {
                set.add(index)
            }
        });
        setCheckedListsIndexes([...Array.from(set)]);
        setLists(userLists);
    }, [userLists]);

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(addUserToLists({userId: user?.id!, listId: parseInt(params.listId), lists: lists}));
        onClose();
    };

    const handleToggleCheckList = (list: Lists, index: number): void => {
        const currentIndex = checkedListsIndexes.indexOf(index);
        const newCheckedListsIndexes = [...checkedListsIndexes];

        const newList = Object.assign({}, list);
        const newMembers = Object.assign([], list.members);

        const listsCopy = [...lists];
        const listsIndex = lists.findIndex((value) => value.id === newList.id);

        if (currentIndex === -1) {
            newCheckedListsIndexes.push(index);

            newMembers.push(user!);
            newList.members = newMembers;

            listsCopy[listsIndex] = newList;
            setLists(listsCopy);
        } else {
            newCheckedListsIndexes.splice(currentIndex, 1);

            const memberIndex = list.members.findIndex((newMember) => newMember.id === user?.id!);
            newMembers.splice(memberIndex, 1);
            newList.members = newMembers;

            listsCopy[listsIndex] = newList;
            setLists(listsCopy);
        }
        setCheckedListsIndexes(newCheckedListsIndexes);
    };

    const isListSelected = (listId: number): boolean => {
        return checkedListsIndexes.findIndex((checkedList) => checkedList === listId) !== -1;
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog} aria-labelledby="form-dialog-title">
            <form onSubmit={onSubmit}>
                <DialogTitle id="form-dialog-title">
                    <CloseButton onClose={onClose}/>
                    Pick a List
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <div className={classes.createList}>
                        Create a new List
                    </div>
                    <div className={classes.list}>
                        <List>
                            {userLists.map((list, index) => (
                                <>
                                    <ListItem
                                        key={list.id}
                                        onClick={() => handleToggleCheckList(list, index)}
                                        selected={isListSelected(index)}
                                        dense button
                                    >
                                        {list.name}
                                        {isListSelected(index) && <span>{CheckIcon}</span>}
                                    </ListItem>
                                </>
                            ))}
                        </List>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default ListsModal;
