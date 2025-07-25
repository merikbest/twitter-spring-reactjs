import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useListsItemStyles } from "./ListsItemStyles";
import { PinIcon, PinIconFilled } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { ListResponse, ListUserResponse } from "../../../types/lists";
import { LISTS } from "../../../constants/path-constants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import FollowListButton from "../../../components/FollowListButton/FollowListButton";
import ListInfoDescription from "./ListInfoDescription";
import ListsItemAvatar from "./ListsItemAvatar";
import { useListsItem } from "./useListsItem";

interface ListsItemProps {
    list?: ListResponse | ListUserResponse;
    listIndex?: number;
    isMyList?: boolean;
}

const ListsItem: FC<ListsItemProps> = memo(({ list, listIndex, isMyList }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useListsItemStyles();
    const { t } = useTranslation();
    const { myProfileId, onClickPinList } = useListsItem(list);

    return (
        <Link to={`${LISTS}/${list?.id}`} className={globalClasses.link}>
            <Paper className={classes.container} style={{ border: (listIndex === 2) ? 0 : 1 }} variant="outlined">
                <ListsItemAvatar listWallpaper={list?.wallpaper} listAltWallpaper={list?.altWallpaper} />
                <div className={classes.listInfoContainer}>
                    <ListInfoDescription
                        listId={list?.id}
                        listName={list?.listName}
                        listDescription={list?.description}
                        listIsPrivate={"isPrivate" in list! && list?.isPrivate}
                        listOwnerFullName={list?.listOwner.fullName}
                        listOwnerUsername={list?.listOwner.username}
                        listOwnerAvatar={list?.listOwner.avatar}
                    />
                    {isMyList && (
                        <ActionIconButton
                            onClick={onClickPinList}
                            actionText={list?.isListPinned
                                ? t("UNPIN", { defaultValue: "Unpin" })
                                : t("PIN", { defaultValue: "Pin" })
                            }
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
