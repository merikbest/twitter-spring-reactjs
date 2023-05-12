import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useFullListUserCountStyles } from "./FullListUserCountStyles";
import { capitalize } from "../../../../util/text-formatter";

interface FullListUserCountProps {
    id: string;
    userCount?: number;
    title: string;
    onOpenModalWindow: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, title: string) => void;
}

const FullListUserCount: FC<FullListUserCountProps> = memo((
    {
        id,
        userCount,
        title,
        onOpenModalWindow
    }
): ReactElement => {
    const classes = useFullListUserCountStyles();

    return (
        <span id={id} className={classes.listMembers} onClick={(event) => onOpenModalWindow(event, title)}>
            <Typography variant={"h6"} component={"span"}>
                {userCount}
            </Typography>
            <Typography variant={"subtitle1"} component={"span"}>
                {" "}{capitalize(title)}
            </Typography>
        </span>
    );
});

export default FullListUserCount;
