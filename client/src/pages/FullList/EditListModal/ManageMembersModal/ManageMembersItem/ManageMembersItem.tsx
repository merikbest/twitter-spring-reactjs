import React, {FC, ReactElement, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import {Avatar, Button, Paper, Typography} from "@material-ui/core";

import {useManageMembersItemStyles} from "./ManageMembersItemStyles";
import {User} from "../../../../../store/ducks/user/contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../../../util/url";
import PopperUserWindow from "../../../../../components/PopperUserWindow/PopperUserWindow";
import {Lists} from "../../../../../store/ducks/lists/contracts/state";
import {processListMember} from "../../../../../store/ducks/lists/actionCreators";

interface ManageMembersItemProps {
    list: Lists;
    member: User;
}

const ManageMembersItem: FC<ManageMembersItemProps> = ({list, member}): ReactElement => {
    const classes = useManageMembersItemStyles();
    const dispatch = useDispatch();

    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visiblePopperUserWindow, setVisiblePopperUserWindow] = useState<boolean>(false);

    const isMember = list.members?.findIndex((listMember) => listMember.id === member.id);

    const handleHover = (): void => {
        setDelayHandler(setTimeout(() => setVisiblePopperUserWindow(true), 1337));
    };

    const onClickAddUserToList = (): void  => {
        dispatch(processListMember({userId: member.id!, listId: list.id}));
    }

    const handleLeave = (): void => {
        clearTimeout(delayHandler);
        setVisiblePopperUserWindow(false);
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Link to={`/user/${member.id}`} className={classes.link}>
                <Avatar
                    className={classes.listAvatar}
                    src={member?.avatar?.src ? member?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <Link to={`/user/${member.id}`} className={classes.link}>
                        <div onMouseLeave={handleLeave} style={{position: "relative", width: 350}}>
                            <Typography onMouseEnter={handleHover} className={classes.fullName}>
                                {member?.fullName}
                            </Typography>
                            {visiblePopperUserWindow && <PopperUserWindow user={member}/>}
                            <Typography className={classes.username} variant="caption" display="block" gutterBottom>
                                @{member?.username}
                            </Typography>
                            <Typography className={classes.about}>
                                {member?.about}
                            </Typography>
                        </div>
                    </Link>
                    <div>
                        {(isMember === -1) ? (
                            <Button
                                className={classes.outlinedButton}
                                onClick={onClickAddUserToList}
                                color="primary"
                                variant="outlined"
                            >
                                Add
                            </Button>
                        ) : (
                            <Button
                                className={classes.containedButton}
                                onClick={onClickAddUserToList}
                                color="primary"
                                variant="contained"
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default ManageMembersItem;
