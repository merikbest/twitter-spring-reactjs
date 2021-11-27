import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, Paper, Typography} from "@material-ui/core";
import {Link} from 'react-router-dom';

import {useListsStyles} from "./ListsStyles";
import BackButton from "../../components/BackButton/BackButton";
import {selectUserData} from "../../store/ducks/user/selectors";
import {AddListsIcon, EditIcon, ListsIcon} from "../../icons";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import {
    fetchLists,
    fetchPinnedLists,
    fetchUserLists,
    setLists,
    setPinnedLists,
    setUserLists
} from "../../store/ducks/lists/actionCreators";
import {
    selectIsListsLoading,
    selectListsItems,
    selectPinnedListsItems,
    selectUserListsItems
} from "../../store/ducks/lists/selectors";
import ListsItem from "./ListsItem/ListsItem";
import PinnedListsItem from "./PinnedListsItem/PinnedListsItem";
import HoverAction from "../../components/HoverAction/HoverAction";
import Spinner from "../../components/Spinner/Spinner";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";

const Lists: FC<HoverActionProps> = ({visibleHoverAction, handleHoverAction, handleLeaveAction}): ReactElement => {
    const classes = useListsStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const lists = useSelector(selectListsItems);
    const userLists = useSelector(selectUserListsItems);
    const pinnedLists = useSelector(selectPinnedListsItems);
    const isLoading = useSelector(selectIsListsLoading);
    const [visibleCreateListModal, setVisibleCreateListModal] = useState<boolean>(false);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchLists());
        dispatch(fetchUserLists());
        dispatch(fetchPinnedLists());

        return () => {
            dispatch(setLists([]));
            dispatch(setUserLists([]));
            dispatch(setPinnedLists([]));
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
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography component={"div"} className={classes.headerFullName}>
                        Lists
                    </Typography>
                    <Typography component={"div"} className={classes.headerUsername}>
                        @{myProfile?.username}
                    </Typography>
                </div>
                <div className={classes.iconGroup}>
                    <div className={classes.icon}>
                        <IconButton
                            onClick={onOpenCreateListModal}
                            onMouseEnter={() => handleHoverAction?.(HoverActions.CREATE_LIST)}
                            onMouseLeave={handleLeaveAction}
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
                                            <Typography component={"span"} className={classes.text}>
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
            {isLoading ? (
                <Spinner paddingTop={250}/>
            ) : (
                <>
                    <Paper className={classes.pinnedLists} variant="outlined">
                        <Typography variant="h6">
                            Pinned Lists
                        </Typography>
                        {(pinnedLists.length === 0) ? (
                            <Typography component={"div"} className={classes.pinnedListsText}>
                                Nothing to see here yet — pin your favorite Lists to access them quickly.
                            </Typography>
                        ) : (
                            <Typography component={"div"} className={classes.pinnedListsWrapper}>
                                {pinnedLists.map((pinnedList) => (<PinnedListsItem pinnedList={pinnedList}/>))}
                            </Typography>
                        )}
                    </Paper>
                    <Paper className={classes.newLists} variant="outlined">
                        <Typography variant="h6">
                            Discover new Lists
                        </Typography>
                        {lists.slice(0, 3).map((list, index) => (
                            <ListsItem key={list.id} item={list} listIndex={index}/>
                        ))}
                        <Link to={"/suggested"} className={classes.link}>
                            <Typography component={"div"} className={classes.showMore}>
                                Show more
                            </Typography>
                        </Link>
                    </Paper>
                    <Paper className={classes.myLists} variant="outlined">
                        <Typography variant="h6">
                            Your Lists
                        </Typography>
                        {userLists.map((list) => (<ListsItem isMyList={true} key={list.id} item={list}/>))}
                    </Paper>
                    <CreateListsModal visible={visibleCreateListModal} onClose={onCloseCreateListModal}/>
                </>
            )}
        </Paper>
    );
};

export default withHoverAction(Lists);
