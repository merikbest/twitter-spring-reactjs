import React, {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Dialog, DialogContent, DialogTitle, List, ListItem, Typography} from "@material-ui/core";

import {useListsModalStyles} from "./ListsModalStyles";
import {
    selectIsSimpleListsLoaded,
    selectIsSimpleListsLoading,
    selectSimpleListsItems
} from "../../store/ducks/lists/selectors";
import {fetchSimpleLists, processUserToLists, resetListsState} from "../../store/ducks/lists/actionCreators";
import CloseButton from "../CloseButton/CloseButton";
import {TweetResponse, UserTweetResponse} from "../../store/types/tweet";
import {SimpleListResponse} from "../../store/types/lists";
import Spinner from "../Spinner/Spinner";
import {UserProfileResponse} from "../../store/types/user";
import {CheckIcon, LockIcon} from "../../icons";

interface ListsModalProps {
    tweet?: TweetResponse;
    user?: UserTweetResponse | UserProfileResponse;
    visible?: boolean;
    onClose: () => void;
}

const ListsModal: FC<ListsModalProps> = ({tweet, user, visible, onClose}): ReactElement | null => {
    const classes = useListsModalStyles();
    const dispatch = useDispatch();
    const simpleLists = useSelector(selectSimpleListsItems);
    const isSimpleListsLoading = useSelector(selectIsSimpleListsLoading);
    const isSimpleListsLoaded = useSelector(selectIsSimpleListsLoaded);
    const [lists, setLists] = useState<SimpleListResponse[]>([]);

    useEffect(() => {
        if (visible) {
            dispatch(fetchSimpleLists(user?.id!));
        }
    }, [visible]);

    useEffect(() => {
        setLists(simpleLists);
    }, [isSimpleListsLoaded]);

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const listsRequest = lists.map((list) => {
            return {
                listId: list.id,
                isMemberInList: list.isMemberInList,
            }
        });
        dispatch(processUserToLists({userId: user?.id!, lists: listsRequest}));
        dispatch(resetListsState());
        setLists([]);
        onClose();
    };

    const onSelect = (listId: number): void => {
        const listsCopy = [...lists];
        const index = listsCopy.findIndex((list) => list.id === listId);
        listsCopy[index] = {...listsCopy[index], isMemberInList: !listsCopy[index].isMemberInList};
        setLists(listsCopy);
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
                        {isSimpleListsLoading ? <Spinner/> : (
                            <List>
                                {lists.map((list) => (
                                    <ListItem
                                        onClick={() => onSelect(list.id)}
                                        selected={list.isMemberInList}
                                        dense button
                                    >
                                        <Avatar
                                            variant="square"
                                            className={classes.listAvatar}
                                            src={list?.wallpaper?.src ? list?.wallpaper?.src : list?.altWallpaper}
                                        />
                                        <Typography component={"span"}>
                                            {list.name}
                                        </Typography>
                                        {!list?.isPrivate && (
                                            <span className={classes.lockIcon}>
                                                {LockIcon}
                                            </span>
                                        )}
                                        {list.isMemberInList && (
                                            <span id={"check"}>
                                                {CheckIcon}
                                            </span>
                                        )}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default ListsModal;
