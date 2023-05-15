import React, { FC, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent } from "@material-ui/core";

import { useFollowerRequestsModalStyles } from "./FollowerRequestsModalSyles";
import { useGlobalStyles } from "../../../../util/globalClasses";
import {
    fetchFollowerRequests,
    resetFollowerRequestsState
} from "../../../../store/ducks/followerRequests/actionCreators";
import {
    selectFollowerRequestsItems,
    selectFollowerRequestsPagesCount,
    selectIsFollowerRequestsLoading
} from "../../../../store/ducks/followerRequests/selectors";
import Spinner from "../../../Spinner/Spinner";
import FollowerRequestsItem from "./FollowerRequestsItem/FollowerRequestsItem";
import EmptyPageDescription from "../../../EmptyPageDescription/EmptyPageDescription";
import InfiniteScrollWrapper from "../../../InfiniteScrollWrapper/InfiniteScrollWrapper";
import DialogTitleComponent from "../../../DialogTitleComponent/DialogTitleComponent";

interface FollowerRequestsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const FollowerRequestsModal: FC<FollowerRequestsModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useFollowerRequestsModalStyles();
    const dispatch = useDispatch();
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
            <DialogTitleComponent title={"Follower requests"} onClose={onClose} />
            <DialogContent id="scrollableDiv" className={globalClasses.dialogContent}>
                <InfiniteScrollWrapper
                    dataLength={followerRequests.length}
                    pagesCount={followerRequestsPagesCount}
                    loadItems={loadFollowerRequests}
                >
                    {(isFollowerRequestsLoading && !followerRequests.length) ? (
                        <Spinner />
                    ) : (
                        (!isFollowerRequestsLoading && !followerRequests.length) ? (
                            <div className={globalClasses.contentWrapper}>
                                <EmptyPageDescription
                                    title={"You don’t have any follower requests"}
                                    subtitle={"When someone requests to follow you, it’ll show up here."}
                                />
                            </div>
                        ) : (
                            <>
                                {followerRequests.map((followers) => (
                                    <FollowerRequestsItem key={followers.id} user={followers} onClose={onClose} />
                                ))}
                                {isFollowerRequestsLoading && <Spinner />}
                            </>
                        )
                    )}
                </InfiniteScrollWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default FollowerRequestsModal;
