import React, { FC, ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { ShareIcon } from "../../../icons";
import { ListItem, Typography } from "@material-ui/core";

const ShareTweet: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <ListItem>
            <>{ShareIcon}</>
            <Typography variant="body1" component="span">
                {t("SHARE_TWEET_VIA", { defaultValue: "Share Tweet via ..." })}
            </Typography>
        </ListItem>
    );
};

export default ShareTweet;
