import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import { usePopperListWindowStyles } from "../PopperListWindowStyles";
import { selectListDetailItemWallpaper } from "../../../../store/ducks/listDetail/selectors";

const PopperListWallpaper = memo((): ReactElement => {
    const classes = usePopperListWindowStyles();
    const wallpaper = useSelector(selectListDetailItemWallpaper);

    return <img className={classes.wallpaperListImg} key={wallpaper} src={wallpaper} alt={wallpaper} />;
});

export default PopperListWallpaper;
