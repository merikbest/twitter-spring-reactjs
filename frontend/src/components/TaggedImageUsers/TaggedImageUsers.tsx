import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTaggedImageUsersStyles } from "./TaggedImageUsersStyles";
import { getUsersInImage } from "../../util/text-formatter";
import { TaggedUserResponse } from "../../types/user";
import { useModalWindow } from "../../hook/useModalWindow";
import CloseButton from "../CloseButton/CloseButton";
import { fetchTaggedImageUsers, resetTaggedImageUsers } from "../../store/ducks/tweet/actionCreators";
import {
    selectIsTaggedImageUsersLoading,
    selectTaggedImageUsers,
    selectUsersPagesCount
} from "../../store/ducks/tweet/selectors";
import InfiniteScrollWrapper from "../InfiniteScrollWrapper/InfiniteScrollWrapper";
import Spinner from "../Spinner/Spinner";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import { ProfileIconFilled } from "../../icons";

interface TaggedImageUsersProps {
    tweetId: number;
    taggedImageUsers: TaggedUserResponse[];
    isFullTweet?: boolean;
}

const TaggedImageUsers: FC<TaggedImageUsersProps> = ({ tweetId, taggedImageUsers, isFullTweet }): ReactElement => {
    const classes = useTaggedImageUsersStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectTaggedImageUsers);
    const isUsersLoading = useSelector(selectIsTaggedImageUsersLoading);
    const usersPagesCount = useSelector(selectUsersPagesCount);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onClickGetTaggedImageUsers = (): void => {
        onOpenModalWindow();
        loadUsers(0);
    };

    const onCloseTaggedImageUsers = (): void => {
        onCloseModalWindow();
        dispatch(resetTaggedImageUsers());
    };

    const loadUsers = (page: number): void => {
        dispatch(fetchTaggedImageUsers({ tweetId, pageNumber: page }));
    };

    return (
        <>
            <Typography
                id={"onClickGetTaggedImageUsers"}
                className={classes.taggedImageUsers}
                onClick={onClickGetTaggedImageUsers}
                variant={isFullTweet ? "subtitle1" : "subtitle2"}
                component={"span"}
            >
                {isFullTweet && ProfileIconFilled}
                {getUsersInImage(taggedImageUsers)}
            </Typography>
            <Dialog className={classes.dialog} open={visibleModalWindow} onClose={onCloseTaggedImageUsers}>
                <DialogTitle>
                    <CloseButton onClose={onCloseTaggedImageUsers} />
                    In this photo
                </DialogTitle>
                <DialogContent id="scrollableDiv" className={classes.content}>
                    <InfiniteScrollWrapper dataLength={users.length} pagesCount={usersPagesCount} loadItems={loadUsers}>
                        {isUsersLoading && !users.length ? (
                            <Spinner paddingTop={250} />
                        ) : (
                            <List>
                                {users.map((user) => (
                                    <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />
                                ))}
                                {isUsersLoading && <Spinner />}
                            </List>
                        )}
                    </InfiniteScrollWrapper>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TaggedImageUsers;
