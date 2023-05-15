import React, { FC, ReactElement } from "react";
import { useGlobalStyles } from "../../util/globalClasses";

import { Typography } from "@material-ui/core";

interface DescriptionProps {
    title: string;
    subtitle: string;
}

const EmptyPageDescription: FC<DescriptionProps> = ({ title, subtitle }): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <div className={globalClasses.infoText}>
            <Typography variant={"h4"} component={"div"}>
                {title}
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                {subtitle}
            </Typography>
        </div>
    );
};

export default EmptyPageDescription;
