import React, {FC, ReactElement} from 'react';
import {Button, Checkbox, Dialog, DialogContent, Divider, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import classnames from "classnames";

import {useRecommendationsModalStyles} from "./RecommendationsModalStyles";
import {useGlobalStyles} from "../../../../../util/globalClasses";

export interface RecommendationsModalProps {
    visible?: boolean;
    onClose: () => void;
}

const RecommendationsModal: FC<RecommendationsModalProps> = ({visible, onClose}): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const classes = useRecommendationsModalStyles();

    if (!visible) {
        return null;
    }

    return (
        <Dialog className={classes.dialog} open={visible} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogContent className={classes.content}>
                <div className={classes.logoIcon}>
                    <TwitterIcon/>
                </div>
                <div className={classes.contentWrapper}>
                    <Typography variant={"h3"} component={"div"}>
                        Which languages do you speak?
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"} className={classes.infoText}>
                        You’ll be able to see Tweets, people, and trends in any languages you choose.
                    </Typography>
                    <div className={classnames(globalClasses.infoItemCheckbox, classes.checkboxWrapper)}>
                        <Typography variant={"body1"} component={"span"}>
                            English
                        </Typography>
                        <Checkbox/>
                    </div>
                    <Divider/>
                    <div className={classnames(globalClasses.infoItemCheckbox, classes.checkboxWrapper)}>
                        <Typography variant={"body1"} component={"span"}>
                            Russian - русский
                        </Typography>
                        <Checkbox/>
                    </div>
                    <Divider/>
                    <div className={classnames(globalClasses.infoItemCheckbox, classes.checkboxWrapper)}>
                        <Typography variant={"body1"} component={"span"}>
                            Chinese - 中文
                        </Typography>
                        <Checkbox/>
                    </div>
                    <Divider/>
                    <Button
                        onClick={onClose}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RecommendationsModal;