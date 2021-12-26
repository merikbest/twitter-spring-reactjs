import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {Dialog, DialogContent, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import {useFollowerRequestsModalStyles} from "./FollowerRequestsModalSyles";
import CloseButton from "../../CloseButton/CloseButton";
import {selectUserData} from "../../../store/ducks/user/selectors";
import FollowerRequestsItem from "./FollowerRequestsItem/FollowerRequestsItem";

interface FollowerRequestsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const FollowerRequestsModal: FC<FollowerRequestsModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useFollowerRequestsModalStyles();
    const myProfile = useSelector(selectUserData);

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog}>
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
                Follower requests
            </DialogTitle>
            <DialogContent className={classes.content}>
                {(myProfile?.followerRequests?.length === 0) ? (
                    <div className={classes.contentWrapper}>
                        <div className={classes.infoWrapper}>
                            <Typography component={"div"} className={classes.infoTitle}>
                                You don’t have any follower requests
                            </Typography>
                            <Typography component={"div"} className={classes.infoText}>
                                When someone requests to follow you, it’ll show up here.
                            </Typography>
                        </div>
                    </div>
                ) : (
                    myProfile?.followerRequests?.map((followers) => (
                        <FollowerRequestsItem key={followers.id} user={followers}/>
                    ))
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FollowerRequestsModal;
