import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

interface PageHeaderTitleProps {
    title: string;
    subtitle: string;
}

const PageHeaderTitle: FC<PageHeaderTitleProps> = ({ title, subtitle }): ReactElement => {
    return (
        <div>
            <Typography variant={"h5"} component={"div"}>
                {title}
            </Typography>
            <Typography variant={"subtitle2"} component={"div"}>
                {subtitle}
            </Typography>
        </div>
    );
};

export default PageHeaderTitle;
