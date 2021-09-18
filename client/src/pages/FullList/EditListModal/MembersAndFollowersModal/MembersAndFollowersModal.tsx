import React, {FC, ReactElement} from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";

import {useMembersAndFollowersModalStyles} from "./MembersAndFollowersModalStyles";
import {User} from "../../../../store/ducks/user/contracts/state";
import ManageMembersItem from "../ManageMembersModal/ManageMembersItem/ManageMembersItem";
import {Lists} from "../../../../store/ducks/lists/contracts/state";

interface MembersAndFollowersModalProps {
    list: Lists;
    users: User[];
    visible: boolean;
    title: string;
    onClose: () => void;
}

const MembersAndFollowersModal: FC<MembersAndFollowersModalProps> = (
    {
        list,
        users,
        visible,
        title,
        onClose
    }
): ReactElement | null => {
    const classes = useMembersAndFollowersModalStyles();

    if (!visible) {
        return null;
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.stopPropagation();
    };

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            onClick={(event) => handleClick(event)}
            className={classes.dialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                {(users.length !== 0) ? (
                    users.map((user) => <ManageMembersItem item={list} member={user}/>)
                ) : (
                    (title === "List members") ? (
                        <div className={classes.infoWrapper}>
                            <div className={classes.title}>There isn’t anyone in this List</div>
                            <div className={classes.text}>When people get added, they’ll show up here.</div>
                        </div>
                    ) : (
                        <div className={classes.infoWrapper}>
                            <div className={classes.title}>There aren’t any followers of this List</div>
                            <div className={classes.text}>When people follow, they’ll show up here.</div>
                        </div>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MembersAndFollowersModal;
