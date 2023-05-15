import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";

import { usePinnedListsItemStyles } from "./PinnedListsItemStyles";
import LockIcon from "../../../../components/LockIcon/LockIcon";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { PinnedListResponse } from "../../../../types/lists";
import PopperListWindow from "../../PopperListWindow/PopperListWindow";
import { LISTS } from "../../../../constants/path-constants";
import { HoverItemDetail, useHoverItem } from "../../../../hook/useHoverItem";
import { fetchListDetail } from "../../../../store/ducks/listDetail/actionCreators";

interface PinnedListsItemProps {
    pinnedList?: PinnedListResponse;
}

const PinnedListsItem: FC<PinnedListsItemProps> = memo(({ pinnedList }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = usePinnedListsItemStyles();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchListDetail);

    return (
        <Link to={`${LISTS}/${pinnedList?.id}`} className={globalClasses.link}>
            <div
                id={"pinnedListWrapper"}
                className={classes.pinnedListWrapper}
                onMouseEnter={() => handleHoverPopper({ listId: pinnedList?.id } as HoverItemDetail)}
                onMouseLeave={handleLeavePopper}
            >
                <Avatar variant="square" className={classes.listAvatar}
                        src={pinnedList?.wallpaper ?? pinnedList?.altWallpaper} />
                <Typography component={"div"} className={classes.pinnedListName}>
                    {pinnedList?.isPrivate && <LockIcon />}
                    {" "}{pinnedList?.name}
                </Typography>
                <PopperListWindow visible={visiblePopperWindow} />
            </div>
        </Link>
    );
});

export default PinnedListsItem;
