import React, {FC, ReactElement} from 'react';
import {Checkbox, Link as MuiLink, Typography} from "@material-ui/core";

import {useGlobalStyles} from "../../../../util/globalClasses";
import {withDocumentTitle} from "../../../../hoc/withDocumentTitle";

const DataSharing: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();

    return (
        <>
            <div className={globalClasses.itemInfoWrapper}>
                <Typography variant={"subtitle2"} component={"div"}>
                    Allow sharing of additional information with Twitter’s business partners.
                </Typography>
            </div>
            <div className={globalClasses.itemInfoWrapper}>
                <div className={globalClasses.infoItemCheckbox}>
                    <Typography variant={"body1"} component={"span"}>
                        Allow additional information sharing with business partners
                    </Typography>
                    <Checkbox/>
                </div>
                <Typography variant={"subtitle2"} component={"div"}>
                    {`Twitter always shares information with business partners as a way to run and improve its products.
                        When enabled, this allows Twitter to share additional information with those partners to help
                        support running Twitter’s business, including making Twitter’s marketing activities on other sites
                        and apps more relevant for you. `}
                    <MuiLink
                        href="https://help.twitter.com/safety-and-security/data-through-partnerships"
                        variant="subtitle2"
                        target="_blank"
                        rel="noopener"
                    >
                        Learn more
                    </MuiLink>
                </Typography>
            </div>
        </>
    );
};

export default withDocumentTitle(DataSharing);
