import React, { FC, ReactElement } from "react";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import { useRecommendationsModalStyles } from "./RecommendationsModalStyles";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import RecommendedLanguage from "./RecommendedLanguage/RecommendedLanguage";
import FullWidthButton from "../../../../../components/Buttons/FullWidthButton/FullWidthButton";

export interface RecommendationsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const RecommendationsModal: FC<RecommendationsModalProps> = ({ visible, onClose }): ReactElement | null => {
    const globalClasses = useGlobalStyles({});
    const classes = useRecommendationsModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose}>
            <DialogContent className={globalClasses.dialogContent}>
                <div className={classes.logoIcon}>
                    <TwitterIcon />
                </div>
                <div className={classes.contentWrapper}>
                    <Typography variant={"h3"} component={"div"}>
                        Which languages do you speak?
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"} className={classes.infoText}>
                        You’ll be able to see Tweets, people, and trends in any languages you choose.
                    </Typography>
                    <RecommendedLanguage title={"English"} />
                    <RecommendedLanguage title={"Russian - русский"} />
                    <RecommendedLanguage title={"Chinese - 中文"} />
                    <FullWidthButton onClick={onClose} title={"Done"} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendationsModal;