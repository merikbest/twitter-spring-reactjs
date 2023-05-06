import React, { FC, memo, ReactElement } from "react";
import { Avatar, Typography } from "@material-ui/core";

import LockIcon from "../../../../components/LockIcon/LockIcon";
import PopperListWindow from "../../PopperListWindow/PopperListWindow";
import { useListsItemStyles } from "../ListsItemStyles";
import { HoverItemDetail, useHoverItem } from "../../../../hook/useHoverItem";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { fetchListDetail } from "../../../../store/ducks/listDetail/actionCreators";

interface ListInfoDescriptionProps {
    listId?: number;
    listName?: string;
    listDescription?: string;
    listIsPrivate?: boolean;
    listOwnerFullName?: string;
    listOwnerUsername?: string;
    listOwnerAvatar?: string;
}

const ListInfoDescription: FC<ListInfoDescriptionProps> = memo((
    {
        listId,
        listName,
        listDescription,
        listIsPrivate,
        listOwnerFullName,
        listOwnerUsername,
        listOwnerAvatar
    }
): ReactElement => {
    const classes = useListsItemStyles();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchListDetail);
    const avatar = listOwnerAvatar ? listOwnerAvatar : DEFAULT_PROFILE_IMG;

    return (
        <div
            id={"listInfoWrapper"}
            className={classes.listInfoWrapper}
            onMouseEnter={() => handleHoverPopper({ listId: listId! } as HoverItemDetail)}
            onMouseLeave={handleLeavePopper}
        >
            <div>
                <Typography variant={"h6"} component={"span"} className={classes.listTitle}>
                    {listName}
                </Typography>
                {listIsPrivate && <LockIcon />}
            </div>
            <Typography variant={"subtitle2"} component={"div"}>
                {listDescription}
            </Typography>
            <div className={classes.listOwnerWrapper}>
                <Avatar className={classes.listOwnerAvatar} src={avatar} />
            </div>
            <div className={classes.listOwnerInfoWrapper}>
                <Typography variant={"subtitle2"} component={"span"} className={classes.listOwnerFullName}>
                    {listOwnerFullName}
                </Typography>
                <Typography variant={"subtitle2"} component={"span"}>
                    @{listOwnerUsername}
                </Typography>
            </div>
            <PopperListWindow visible={visiblePopperWindow} />
        </div>
    );
});

export default ListInfoDescription;
