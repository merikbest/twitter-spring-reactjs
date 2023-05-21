import React, { FC, memo, ReactElement } from "react";
import { Avatar } from "@material-ui/core";

import { useListsItemStyles } from "../ListsItemStyles";

interface ListsItemAvatarProps {
    listWallpaper?: string;
    listAltWallpaper?: string;
}

const ListsItemAvatar: FC<ListsItemAvatarProps> = memo(({ listWallpaper, listAltWallpaper }): ReactElement => {
    const classes = useListsItemStyles();
    const wallpaper = listWallpaper ?? listAltWallpaper;

    return <Avatar variant="square" className={classes.listAvatar} src={wallpaper} />;
});

export default ListsItemAvatar;
