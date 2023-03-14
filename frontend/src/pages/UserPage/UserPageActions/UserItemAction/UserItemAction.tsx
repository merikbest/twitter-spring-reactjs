import React, { FC, memo, ReactElement } from "react";

import { ListItem, Typography } from "@material-ui/core";

interface UserItemActionProps {
    title: string;
    icon: JSX.Element;
}

const UserItemAction: FC<UserItemActionProps> = memo(({ title, icon }): ReactElement => {
    return (
        <ListItem>
            <>{icon}</>
            <Typography component={"span"}>
                {title}
            </Typography>
        </ListItem>
    );
});

export default UserItemAction;
