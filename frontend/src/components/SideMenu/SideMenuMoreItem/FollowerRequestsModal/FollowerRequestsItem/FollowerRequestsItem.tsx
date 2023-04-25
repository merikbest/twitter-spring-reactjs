import React, { FC, memo, MouseEvent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Paper } from "@material-ui/core";
import classNames from "classnames";

import { useFollowerRequestsItemStyles } from "./FollowerRequestsItemStyles";
import { FollowerUserResponse } from "../../../../../types/user";
import { acceptFollowRequest, declineFollowRequest } from "../../../../../store/ducks/followerRequests/actionCreators";
import { PROFILE } from "../../../../../constants/path-constants";
import UserRequestsInfo from "./UserRequestsInfo/UserRequestsInfo";
import UserRequestsAvatar from "./UserRequestsAvatar/UserRequestsAvatar";

interface FollowerRequestsItemProps {
    user: FollowerUserResponse,
    onClose: () => void;
}

const FollowerRequestsItem: FC<FollowerRequestsItemProps> = memo(({ user, onClose }): ReactElement => {
    const classes = useFollowerRequestsItemStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickUser = () => {
        onClose();
        history.push(`${PROFILE}/${user?.id}`);
    };

    const handleDeclineFollowerRequest = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(declineFollowRequest(user.id!));
    };

    const handleAcceptFollowerRequest = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(acceptFollowRequest(user.id!));
    };

    return (
        <Paper onClick={onClickUser} className={classes.container} variant="outlined">
            <UserRequestsAvatar avatar={user.avatar} />
            <div style={{ flex: 1 }}>
                <UserRequestsInfo user={user} />
                <div className={classes.buttonWrapper}>
                    <div className={classNames(classes.buttonItemWrapper, classes.declineButton)}>
                        <Button
                            onClick={handleDeclineFollowerRequest}
                            color="primary"
                            variant="outlined"
                            size="small"
                            fullWidth
                        >
                            Decline
                        </Button>
                    </div>
                    <div className={classNames(classes.buttonItemWrapper, classes.acceptButton)}>
                        <Button
                            onClick={handleAcceptFollowerRequest}
                            color="primary"
                            variant="outlined"
                            size="small"
                            fullWidth
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    );
});

export default FollowerRequestsItem;
