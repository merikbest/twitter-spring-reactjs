import React, { FC, memo, ReactElement } from "react";
import { Avatar, Typography } from "@material-ui/core";

import LockIcon from "../../LockIcon/LockIcon";
import { CheckIcon } from "../../../icons";
import { SimpleListResponse } from "../../../types/lists";
import { useListsModalStyles } from "../ListsModalStyles";

interface ListsModalItemProps {
    list: SimpleListResponse;
}

const ListsModalItem: FC<ListsModalItemProps> = memo(({ list }): ReactElement => {
    const classes = useListsModalStyles();
    const wallpaper = list?.wallpaper ?? list?.altWallpaper;

    return (
        <>
            <Avatar variant="square" className={classes.listAvatar} src={wallpaper} />
            <Typography component={"span"}>
                {list.name}
            </Typography>
            {list?.isPrivate && <LockIcon />}
            {list.isMemberInList && <span id={"check"}>{CheckIcon}</span>}
        </>
    );
});

export default ListsModalItem;
