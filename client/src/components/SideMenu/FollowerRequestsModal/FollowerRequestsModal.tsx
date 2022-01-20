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
                            <Typography variant={"h4"} component={"div"}>
                                You don’t have any follower requests
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                When someone requests to follow you, it’ll show up here.
                            </Typography>
                        </div>
                    </div>
                ) : (
                    myProfile?.followerRequests?.map((followers) => (
                        <FollowerRequestsItem key={followers.id} user={followers} onClose={onClose}/>
                    ))
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FollowerRequestsModal;
