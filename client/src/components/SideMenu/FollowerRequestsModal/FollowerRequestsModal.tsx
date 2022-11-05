import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import {useFollowerRequestsModalStyles} from "./FollowerRequestsModalSyles";
import CloseButton from "../../CloseButton/CloseButton";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {useGlobalStyles} from "../../../util/globalClasses";
import {fetchFollowerRequests, resetFollowerRequestsState} from "../../../store/ducks/followerRequests/actionCreators";
import {
    selectFollowerRequestsItems,
    selectFollowerRequestsPagesCount,
    selectIsFollowerRequestsLoading
} from "../../../store/ducks/followerRequests/selectors";
import Spinner from "../../Spinner/Spinner";
import FollowerRequestsItem from "./FollowerRequestsItem/FollowerRequestsItem";
import EmptyPageDescription from "../../EmptyPageDescription/EmptyPageDescription";
import InfiniteScrollWrapper from "../../InfiniteScrollWrapper/InfiniteScrollWrapper";

interface FollowerRequestsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const FollowerRequestsModal: FC<FollowerRequestsModalProps> = ({visible, onClose}): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const classes = useFollowerRequestsModalStyles();
    const dispatch = useDispatch();
    const followerRequestsSize = useSelector(selectUserData);
    const isFollowerRequestsLoading = useSelector(selectIsFollowerRequestsLoading);
    const followerRequestsPagesCount = useSelector(selectFollowerRequestsPagesCount);
    const followerRequests = useSelector(selectFollowerRequestsItems);

    useEffect(() => {
        if (visible) {
            loadFollowerRequests(0);
        }
        return () => {
            dispatch(resetFollowerRequestsState());
        };
    }, [visible]);

    const loadFollowerRequests = (page: number): void => {
        dispatch(fetchFollowerRequests(page));
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog}>
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
                Follower requests
            </DialogTitle>
            <DialogContent id="scrollableDiv" className={classes.content}>
                <InfiniteScrollWrapper
                    dataLength={followerRequests.length}
                    pagesCount={followerRequestsPagesCount}
                    loadItems={loadFollowerRequests}
                >
                    {(isFollowerRequestsLoading && !followerRequests.length) ? (
                        <Spinner/>
                    ) : (
                        (!isFollowerRequestsLoading && !followerRequestsSize) ? (
                            <div className={globalClasses.contentWrapper}>
                                <EmptyPageDescription
                                    title={"You don’t have any follower requests"}
                                    subtitle={"When someone requests to follow you, it’ll show up here."}
                                />
                            </div>
                        ) : (
                            <>
                                {followerRequests.map((followers) => (
                                    <FollowerRequestsItem key={followers.id} user={followers} onClose={onClose}/>
                                ))}
                                {isFollowerRequestsLoading && <Spinner/>}
                            </>
                        )
                    )}
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default FollowerRequestsModal;
