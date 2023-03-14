import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import { useFullListStyles } from "../FullListStyles";
import { selectListItemOwnerWallpaper } from "../../../store/ducks/list/selectors";

const FullListWallpaper = memo((): ReactElement => {
    const classes = useFullListStyles();
    const listWallpaper = useSelector(selectListItemOwnerWallpaper);

    return (
        <div className={classes.wallpaper}>
            <img key={listWallpaper} src={listWallpaper} alt={listWallpaper} />
        </div>
    );
});

export default FullListWallpaper;
