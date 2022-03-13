import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, Paper, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {compose} from "recompose";

import {useListsStyles} from "./ListsStyles";
import BackButton from "../../components/BackButton/BackButton";
import {selectUserData} from "../../store/ducks/user/selectors";
import {AddListsIcon, EditIcon, ListsIcon} from "../../icons";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import {fetchLists, fetchPinnedLists, fetchUserLists, resetListsState} from "../../store/ducks/lists/actionCreators";
import {
    selectIsListsLoading,
    selectIsLoading, selectIsPinnedListsLoaded,
    selectIsPinnedListsLoading,
    selectIsUserListsLoading,
    selectListsItems,
    selectPinnedListsItems,
    selectUserListsItems
} from "../../store/ducks/lists/selectors";
import ListsItem from "./ListsItem/ListsItem";
import PinnedListsItem from "./PinnedListsItem/PinnedListsItem";
import HoverAction from "../../components/HoverAction/HoverAction";
import Spinner from "../../components/Spinner/Spinner";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import {useGlobalStyles} from "../../util/globalClasses";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

const Lists: FC<HoverActionProps> = ({visibleHoverAction, handleHoverAction, handleLeaveAction}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useListsStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const lists = useSelector(selectListsItems);
    const userLists = useSelector(selectUserListsItems);
    const pinnedLists = useSelector(selectPinnedListsItems);
    const isLoading = useSelector(selectIsLoading);
    const isPinnedListsLoading = useSelector(selectIsPinnedListsLoading);
    const isPinnedListsLoaded = useSelector(selectIsPinnedListsLoaded);
    const isListsLoading = useSelector(selectIsListsLoading);
    const isUserListsLoading = useSelector(selectIsUserListsLoading);
    const [visibleCreateListModal, setVisibleCreateListModal] = useState<boolean>(false);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchLists());
        dispatch(fetchUserLists());
        dispatch(fetchPinnedLists());

        return () => {
            dispatch(resetListsState());
        };
    }, []);

    const onOpenCreateListModal = (): void => {
        setVisibleCreateListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleCreateListModal(false);
    };

    const handleClick = (): void => {
        setOpenPopover((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpenPopover(false);
    };

    return (
        <Paper className={globalClasses.pageContainer} variant="outlined">
            <Paper className={globalClasses.pageHeader} variant="outlined">
                <BackButton/>
                {!isLoading && (
                    <div>
                        <Typography variant="h5" component={"div"}>
                            Lists
                        </Typography>
                        <Typography variant="subtitle2" component={"div"}>
                            @{myProfile?.username}
                        </Typography>
                    </div>
                )}
                <div className={classes.iconGroup}>
                    <div className={classes.icon}>
                        <IconButton
                            onClick={onOpenCreateListModal}
                            onMouseEnter={() => handleHoverAction?.(HoverActions.CREATE_LIST)}
                            onMouseLeave={handleLeaveAction}
                            color="primary"
                        >
                            <>{AddListsIcon}</>
                            <HoverAction visible={visibleHoverAction?.visibleCreateListAction} actionText={"Create"}/>
                        </IconButton>
                    </div>
                    <div className={classes.icon}>
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div>
                                <IconButton
                                    onClick={handleClick}
                                    onMouseEnter={() => handleHoverAction?.(HoverActions.MORE)}
                                    onMouseLeave={handleLeaveAction}
                                    color="primary"
                                >
                                    <>{EditIcon}</>
                                    <HoverAction visible={visibleHoverAction?.visibleMoreAction} actionText={"More"}/>
                                </IconButton>
                                {openPopover ? (
                                    <Link to={`/lists/memberships/${myProfile?.id}`} className={classes.dropdownLink}>
                                        <div className={classes.dropdown}>
                                            <span className={classes.textIcon}>
                                                {ListsIcon}
                                            </span>
                                            <Typography variant={"body1"} component={"span"}>
                                                Lists you’re on
                                            </Typography>
                                        </div>
                                    </Link>
                                ) : null}
                            </div>
                        </ClickAwayListener>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.pinnedLists} variant="outlined">
                <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                    Pinned Lists
                </Typography>
                <Typography component={"div"} className={classes.pinnedListsWrapper}>
                    {isPinnedListsLoading ? (
                        <Spinner paddingTop={34} />
                    ) : (
                        (pinnedLists.length === 0 && isPinnedListsLoaded) ? (
                            <Typography variant={"subtitle1"} component={"div"} className={classes.pinnedListsText}>
                                Nothing to see here yet — pin your favorite Lists to access them quickly.
                            </Typography>
                        ) : (
                            pinnedLists.map((pinnedList) => (
                                <PinnedListsItem key={pinnedList.id} pinnedList={pinnedList}/>
                            ))
                        )
                    )}
                </Typography>
            </Paper>
            <Paper className={classes.newLists} variant="outlined">
                <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                    Discover new Lists
                </Typography>
                {isListsLoading ? (
                    <div style={{padding: "59px 0px"}}>
                        <Spinner/>
                    </div>
                ) : (
                    lists.slice(0, 3).map((list, index) => (
                        <ListsItem key={list.id} item={list} listIndex={index}/>
                    ))
                )}
                <Link to={"/suggested"} className={globalClasses.link}>
                    <Typography variant={"body1"} component={"div"} className={classes.showMore}>
                        Show more
                    </Typography>
                </Link>
            </Paper>
            <Paper className={classes.myLists} variant="outlined">
                <Typography variant="h5" className={globalClasses.itemInfoWrapper}>
                    Your Lists
                </Typography>
                {isUserListsLoading ? (
                    <Spinner/>
                ) : (
                    userLists.map((list) => (<ListsItem key={list.id} isMyList={true} item={list}/>))
                )}
            </Paper>
            <CreateListsModal visible={visibleCreateListModal} onClose={onCloseCreateListModal}/>
        </Paper>
    );
};

export default compose(withHoverAction, withDocumentTitle)(Lists);
