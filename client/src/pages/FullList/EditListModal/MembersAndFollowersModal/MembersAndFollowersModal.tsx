import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle, Typography} from "@material-ui/core";

import {useMembersAndFollowersModalStyles} from "./MembersAndFollowersModalStyles";
import {User} from "../../../../store/ducks/user/contracts/state";
import ManageMembersItem from "../ManageMembersModal/ManageMembersItem/ManageMembersItem";
import CloseButton from "../../../../components/CloseButton/CloseButton";
import {selectListItem} from "../../../../store/ducks/list/selectors";

interface MembersAndFollowersModalProps {
    visible: boolean;
    title: string;
    onClose: () => void;
}

const MembersAndFollowersModal: FC<MembersAndFollowersModalProps> = (
    {
        visible,
        title,
        onClose
    }
): ReactElement | null => {
    const classes = useMembersAndFollowersModalStyles();
    const [users, setUsers] = useState<User[]>([]);
    const list = useSelector(selectListItem);

    useEffect(() => {
        if (title === "List members") {
            setUsers(list?.members!);
        } else {
            setUsers(list?.followers!);
        }
    }, [visible]);

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
                <CloseButton onClose={onClose}/>
                {title}
            </DialogTitle>
            <DialogContent className={classes.content}>
                {(users.length !== 0) ? (
                    users.map((user) => <ManageMembersItem item={list} member={user}/>)
                ) : (
                    <div className={classes.infoWrapper}>
                        <Typography component={"div"} className={classes.title}>
                            {(title === "List members") ? (
                                "There isn’t anyone in this List"
                            ) : (
                                "There aren’t any followers of this List"
                            )}
                        </Typography>
                        <Typography component={"div"} className={classes.text}>
                            {(title === "List members") ? (
                                "When people get added, they’ll show up here."
                            ) : (
                                "When people follow, they’ll show up here."
                            )}
                        </Typography>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MembersAndFollowersModal;
