import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IconButton, Paper, Typography} from "@material-ui/core";

import {useListsStyles} from "./ListsStyles";
import {BackButton} from "../../components/BackButton/BackButton";
import {selectUserData} from "../../store/ducks/user/selectors";
import {AddListsIcon, EditIcon} from "../../icons";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import {fetchLists, fetchUserLists} from "../../store/ducks/lists/actionCreators";
import {selectListsItems, selectUserListsItems} from "../../store/ducks/lists/selectors";
import ListsItem from "./ListsItem/ListsItem";

const Lists: FC = (): ReactElement => {
    const classes = useListsStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const lists = useSelector(selectListsItems);
    const userLists = useSelector(selectUserListsItems);

    const [visibleCreateListModal, setVisibleCreateListModal] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchLists());
        dispatch(fetchUserLists());
    }, []);

    const onOpenCreateListModal = (): void => {
        setVisibleCreateListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleCreateListModal(false);
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Paper className={classes.header} variant="outlined">
                <BackButton/>
                <div>
                    <Typography variant="h6">Lists</Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        @{myProfile?.username}
                    </Typography>
                </div>
                <div className={classes.iconGroup}>
                    <div className={classes.icon}>
                        <IconButton color="primary" onClick={onOpenCreateListModal}>
                            <>{AddListsIcon}</>
                        </IconButton>
                    </div>
                    <div className={classes.icon}>
                        <IconButton color="primary">
                            <>{EditIcon}</>
                        </IconButton>
                    </div>
                </div>
            </Paper>
            <Paper className={classes.pinnedLists} variant="outlined">
                <Typography variant="h6">Pinned Lists</Typography>
                <div className={classes.pinnedListsText}>
                    Nothing to see here yet — pin your favorite Lists to access them quickly.
                </div>
            </Paper>
            <Paper className={classes.newLists} variant="outlined">
                <Typography variant="h6">Discover new Lists</Typography>
                {lists.map((list) => <ListsItem key={list.id} list={list}/>)}
            </Paper>
            <Paper className={classes.myLists} variant="outlined">
                <Typography variant="h6">Your Lists</Typography>
                {userLists.map((list) => <ListsItem key={list.id} list={list}/>)}
            </Paper>
            {visibleCreateListModal && (
                <CreateListsModal visible={visibleCreateListModal} onClose={onCloseCreateListModal}/>
            )}
        </Paper>
    );
};

export default Lists;
