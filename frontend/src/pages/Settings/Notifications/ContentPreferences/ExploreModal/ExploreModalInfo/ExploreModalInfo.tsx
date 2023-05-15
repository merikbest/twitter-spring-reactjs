import React, { FC, ReactElement, useState } from "react";
import { Checkbox, Typography } from "@material-ui/core";

import { useGlobalStyles } from "../../../../../../util/globalClasses";

interface ExploreModalInfoProps {
    isSearchModal: boolean;
    searchModalTitle: string;
    title: string;
    subtitle: string | JSX.Element;
}

const ExploreModalInfo: FC<ExploreModalInfoProps> = (
    {
        isSearchModal,
        searchModalTitle,
        title,
        subtitle
    }
): ReactElement => {
    const globalClasses = useGlobalStyles({});

    return (
        <>
            {!isSearchModal && (
                <div className={globalClasses.itemInfoWrapper}>
                    <Typography variant={"h5"} component={"div"}>
                        {searchModalTitle}
                    </Typography>
                </div>
            )}
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        {title}
                    </Typography>
                    <Checkbox />
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {subtitle}
                </Typography>
            </div>
        </>
    );
};

export default ExploreModalInfo;
