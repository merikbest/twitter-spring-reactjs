import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { useTopTweetsItemStyles } from "./TopTweetsItemStyles";

interface TopTweetsItemProps {
    icon: JSX.Element;
    title: string;
    subtitle: string;
}

const TopTweetsItem: FC<TopTweetsItemProps> = ({ icon, title, subtitle }): ReactElement => {
    const classes = useTopTweetsItemStyles();

    return (
        <ListItem>
            <div className={classes.listItemWrapper}>
                <span className={classes.textIcon}>
                    {icon}
                </span>
                <div>
                    <Typography variant={"body1"} component={"div"}>
                        {title}
                    </Typography>
                    <Typography variant={"subtitle2"} component={"div"}>
                        {subtitle}
                    </Typography>
                </div>
            </div>
        </ListItem>
    );
};

export default TopTweetsItem;
