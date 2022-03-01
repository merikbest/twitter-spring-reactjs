import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dialog, DialogContent, DialogTitle, List, ListItem, Typography} from "@material-ui/core";

import {useListsModalStyles} from "./ListsModalStyles";
import {selectUserListsItems} from "../../store/ducks/lists/selectors";
import {fetchUserLists} from "../../store/ducks/lists/actionCreators";
import {CheckIcon} from "../../icons";
import {Lists} from "../../store/ducks/lists/contracts/state";
import CloseButton from "../CloseButton/CloseButton";
import {TweetResponse, UserTweetResponse} from "../../store/types/tweet";
import {processUserToLists} from "../../store/ducks/listMembers/actionCreators";
import {ListResponse, ListUserResponse} from "../../store/types/lists";

interface ListsModalProps {
    tweet?: TweetResponse;
    user?: UserTweetResponse;
    visible?: boolean;
    onClose: () => void;
}
// TODO REFACTOR
const ListsModal: FC<ListsModalProps> = ({tweet, user, visible, onClose}): ReactElement | null => {
    const classes = useListsModalStyles();
    const dispatch = useDispatch();
    const userLists = useSelector(selectUserListsItems);
    const params = useParams<{ listId: string }>();

    const [checkedListsIndexes, setCheckedListsIndexes] = useState<number[]>([]);
    const [lists, setLists] = useState<ListUserResponse[]>([]);

    useEffect(() => {
        if (visible) {
            dispatch(fetchUserLists());
        }
    }, [visible]);

    useEffect(() => {
        const set = new Set([...checkedListsIndexes]);

        // userLists.forEach((list, index) => {
        //     let currentIndex = list.members.findIndex((listUser) => listUser.id === user!.id);
        //
        //     if (currentIndex !== -1) {
        //         set.add(index)
        //     }
        // });
        // setCheckedListsIndexes([...Array.from(set)]);
        // setLists(userLists);
    }, [userLists]);

    // TODO change method
    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // dispatch(addUserToLists({userId: user?.id!, listId: parseInt(params.listId), lists: lists}));
        // dispatch(processUserToLists({userId: user?.id!, listId: parseInt(params.listId), lists: lists}));
        onClose();
    };

    // TODO change method
    const handleToggleCheckList = (list: Lists, index: number): void => {
        const currentIndex = checkedListsIndexes.indexOf(index);
        const newCheckedListsIndexes = [...checkedListsIndexes];

        const newList = Object.assign({}, list);
        const newMembers = Object.assign([], list.members);

        const listsCopy = [...lists];
        const listsIndex = lists.findIndex((value) => value.id === newList.id);

        if (currentIndex === -1) {
            newCheckedListsIndexes.push(index);

            // newMembers.push(user!);
            newList.members = newMembers;

            // listsCopy[listsIndex] = newList;
            setLists(listsCopy);
        } else {
            newCheckedListsIndexes.splice(currentIndex, 1);

            const memberIndex = list.members.findIndex((newMember) => newMember.id === user?.id!);
            newMembers.splice(memberIndex, 1);
            newList.members = newMembers;

            // listsCopy[listsIndex] = newList;
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
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Save
                    </Button>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    <Typography variant={"body1"} component={"div"} className={classes.createList}>
                        Create a new List
                    </Typography>
                    <div className={classes.list}>
                        <List>
                            {userLists.map((list, index) => (
                                <>
                                    <ListItem
                                        key={list.id}
                                        // onClick={() => handleToggleCheckList(list, index)}
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
