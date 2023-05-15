import React, { FC, ReactElement, useState } from "react";
import { Checkbox, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../../util/globalClasses";

interface SettingsModalItemProps {
    title: string;
    subtitle: string;
    text: string;
}

const SettingsModalItem: FC<SettingsModalItemProps> = ({ title, subtitle, text }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const [checked, setChecked] = useState<boolean>(true);

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"h5"} component={"div"}>
                    {title}
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        {subtitle}
                    </Typography>
                    <Checkbox checked={checked} onChange={() => setChecked(prevState => !prevState)} />
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {text}
                </Typography>
            </div>
        </>
    );
};

export default SettingsModalItem;
