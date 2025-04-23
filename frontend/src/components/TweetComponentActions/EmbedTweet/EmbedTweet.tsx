import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { EmbedTweetIcon } from "../../../icons";

const EmbedTweet: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <ListItem>
            <>{EmbedTweetIcon}</>
            <Typography variant="body1" component="span">
                {t("EMBED_TWEET", { defaultValue: "Embed Tweet" })}
            </Typography>
        </ListItem>
    );
};

export default EmbedTweet;
