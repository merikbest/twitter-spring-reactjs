import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTaggedImageUsersStyles } from "./TaggedImageUsersStyles";
import { getUsersInImage } from "../../../../util/text-formatter";
import { TaggedUserResponse } from "../../../../types/user";
import { useModalWindow } from "../../../../hook/useModalWindow";
import CloseButton from "../../../CloseButton/CloseButton";
import { useDispatch } from "react-redux";

interface TaggedImageUsersProps {
    taggedImageUsers: TaggedUserResponse[];
}

const TaggedImageUsers: FC<TaggedImageUsersProps> = ({ taggedImageUsers }): ReactElement => {
    const classes = useTaggedImageUsersStyles();
    const dispatch = useDispatch();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    const onClickGetTaggedImageUsers = (): void => {
        onOpenModalWindow();
    };

    return (
        <>
            <Typography
                className={classes.taggedImageUsers}
                onClick={onClickGetTaggedImageUsers}
                variant={"subtitle2"}
                component={"span"}
            >
                {getUsersInImage(taggedImageUsers)}
            </Typography>
            <Dialog className={classes.dialog} open={visibleModalWindow} onClose={onCloseModalWindow}>
                <DialogTitle>
                    <CloseButton onClose={onCloseModalWindow} />
                    In this photo
                </DialogTitle>
                <DialogContent id="scrollableDiv" className={classes.content}>
                    {/*<InfiniteScrollWrapper dataLength={users.length} pagesCount={usersPagesCount} loadItems={loadUsers}>*/}
                    {/*    {isUsersLoading && !users.length ? (*/}
                    {/*        <Spinner paddingTop={250} />*/}
                    {/*    ) : (*/}
                    {/*        <List>*/}
                    {/*            {users.map((user) => (*/}
                    {/*                <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />*/}
                    {/*            ))}*/}
                    {/*            {isUsersLoading && <Spinner />}*/}
                    {/*        </List>*/}
                    {/*    )}*/}
                    {/*</InfiniteScrollWrapper>*/}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TaggedImageUsers;
