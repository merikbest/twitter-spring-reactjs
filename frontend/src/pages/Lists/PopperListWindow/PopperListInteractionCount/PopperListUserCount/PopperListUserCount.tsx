import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { usePopperListUserCountStyles } from "./PopperListUserCountStyles";
import { capitalize } from "../../../../../util/text-formatter";

interface PopperListUserCountProps {
    id: string;
    userCount?: number;
    title: string;
    onOpenModalWindow: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, title: string) => void;
}

const PopperListUserCount: FC<PopperListUserCountProps> = memo((
    {
        id,
        userCount,
        title,
        onOpenModalWindow
    }
): ReactElement => {
    const classes = usePopperListUserCountStyles();

    return (
        <span id={id} className={classes.popperListMembers} onClick={(event) => onOpenModalWindow(event, title)}>
            <Typography variant={"h6"} component={"span"}>
                {userCount}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" "}{capitalize(title)}
            </Typography>
        </span>
    );
});

export default PopperListUserCount;
