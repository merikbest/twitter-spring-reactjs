import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Typography } from "@material-ui/core";

import { PROFILE } from "../../../constants/path-constants";

interface TweetReplyingUsernameProps {
    addressedId?: number;
    addressedUsername?: string;
}

const TweetReplyingUsername: FC<TweetReplyingUsernameProps> = memo((
    { addressedId, addressedUsername }
): ReactElement => {
    return (
        <object>
            <Typography variant={"subtitle1"} component={"div"}>
                {"Replying to "}
                <MuiLink variant="subtitle1" to={`${PROFILE}/${addressedId}`} component={Link}>
                    @{addressedUsername}
                </MuiLink>
            </Typography>
        </object>
    );
});

export default TweetReplyingUsername;
