import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper } from "@material-ui/core";

import { useListsItemStyles } from "./ListsItemStyles";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { PinIcon, PinIconFilled } from "../../../icons";
import { pinList, unpinList } from "../../../store/ducks/lists/actionCreators";
import { useGlobalStyles } from "../../../util/globalClasses";
import { ListResponse, ListUserResponse } from "../../../types/lists";
import { LISTS } from "../../../constants/path-constants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";
import ListInfoDescription from "./ListInfoDescription/ListInfoDescription";
import ListsItemAvatar from "./ListsItemAvatar/ListsItemAvatar";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = memo(({ list, listIndex, isMyList }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useListsItemStyles();
    const dispatch = useDispatch();
    const myProfileId = useSelector(selectUserDataId);

    const onClickPinList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        event.stopPropagation();

        if (list?.isListPinned) {
            dispatch(unpinList(list!.id));
        } else {
            dispatch(pinList(list!.id));
        }
    };

    return (
        <Link to={`${LISTS}/${list?.id}`} className={globalClasses.link}>
            <Paper className={classes.container} style={{ border: (listIndex === 2) ? 0 : 1 }} variant="outlined">
                <ListsItemAvatar listWallpaper={list?.wallpaper} listAltWallpaper={list?.altWallpaper} />
                <div className={classes.listInfoContainer}>
                    <ListInfoDescription
                        listId={list?.id}
                        listName={list?.name}
                        listDescription={list?.description}
                        listIsPrivate={"isPrivate" in list! && list?.isPrivate}
                        listOwnerFullName={list?.listOwner.fullName}
                        listOwnerUsername={list?.listOwner.username}
                        listOwnerAvatar={list?.listOwner.avatar}
                    />
                    {isMyList && (
                        <ActionIconButton
                            onClick={onClickPinList}
                            actionText={list?.isListPinned ? "Unpin" : "Pin"}
                            icon={list?.isListPinned ? PinIconFilled : PinIcon}
                        />
                    )}
                    {(myProfileId === list?.listOwner.id || isMyList) ? null : (
                        <FollowListButton
                            listId={list!.id}
                            isFollower={(list as ListResponse).isFollower}
                        />
                    )}
                </div>
            </Paper>
        </Link>
    );
});

export default ListsItem;
