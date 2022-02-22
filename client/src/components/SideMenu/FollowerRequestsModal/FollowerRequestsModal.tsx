import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import {useFollowerRequestsModalStyles} from "./FollowerRequestsModalSyles";
import CloseButton from "../../CloseButton/CloseButton";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../util/globalClasses";
import {fetchFollowerRequests} from "../../../store/ducks/followerRequests/actionCreators";
import {
    selectFollowerRequestsItems,
    selectIsFollowerRequestsLoading
} from "../../../store/ducks/followerRequests/selectors";
import Spinner from "../../Spinner/Spinner";
import FollowerRequestsItem from "./FollowerRequestsItem/FollowerRequestsItem";

interface FollowerRequestsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const FollowerRequestsModal: FC<FollowerRequestsModalProps> = ({visible, onClose}): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const classes = useFollowerRequestsModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isFollowerRequestsLoading = useSelector(selectIsFollowerRequestsLoading);
    const followerRequests = useSelector(selectFollowerRequestsItems);

    useEffect(() => {
        if (visible) {
            dispatch(fetchFollowerRequests());
        }
    }, [visible]);

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
                {(myProfile?.followerRequestsSize === 0) ? (
                    <div className={globalClasses.contentWrapper}>
                        <div className={globalClasses.infoText}>
                            <Typography variant={"h4"} component={"div"}>
                                You don’t have any follower requests
                            </Typography>
                            <Typography variant={"subtitle1"} component={"div"}>
                                When someone requests to follow you, it’ll show up here.
                            </Typography>
                        </div>
                    </div>
                ) : (
                    <>
                        {isFollowerRequestsLoading ? <Spinner/> : (
                            followerRequests.map((followers) => (
                                <FollowerRequestsItem key={followers.id} user={followers} onClose={onClose}/>
                            ))
                        )}
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default FollowerRequestsModal;
