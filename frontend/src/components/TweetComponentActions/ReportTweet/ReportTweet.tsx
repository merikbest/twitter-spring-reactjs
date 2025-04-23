import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { ReportIcon } from "../../../icons";

const ReportTweet: FC = (): ReactElement => {
    const { t } = useTranslation();

    return (
        <ListItem>
            <>{ReportIcon}</>
            <Typography variant="body1" component="span">
                {t("REPORT_TWEET", { defaultValue: "Report Tweet" })}
            </Typography>
        </ListItem>
    );
};

export default ReportTweet;
