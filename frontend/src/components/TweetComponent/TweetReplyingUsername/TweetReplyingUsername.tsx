import React, { FC, memo, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { PROFILE } from "../../../constants/path-constants";

interface TweetReplyingUsernameProps {
    addressedId?: number;
    addressedUsername?: string;
}

const TweetReplyingUsername: FC<TweetReplyingUsernameProps> = memo((
    {
        addressedId,
        addressedUsername
    }
): ReactElement => {
    const { t } = useTranslation();

    return (
        <object>
            <Typography variant="subtitle1" component="div">
                {t("REPLYING_TO", { defaultValue: "Replying to" })}
                {" "}
                <MuiLink variant="subtitle1" to={`${PROFILE}/${addressedId}`} component={Link}>
                    @{addressedUsername}
                </MuiLink>
            </Typography>
        </object>
    );
});

export default TweetReplyingUsername;
