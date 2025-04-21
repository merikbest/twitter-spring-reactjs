import React, { FC, ReactElement } from "react";
import { Button, Hidden } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { useTranslation } from "react-i18next";

import AddTweetModal from "../../AddTweetModal/AddTweetModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useSideMenuStyles } from "../SideMenuStyles";

const AddTweetButton: FC = (): ReactElement => {
    const classes = useSideMenuStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <li className={classes.itemWrapper}>
            <Button
                onClick={onOpenModalWindow}
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
            >
                <Hidden smDown>
                    {t("TWEET", { defaultValue: "Tweet" })}
                </Hidden>
                <Hidden mdUp>
                    <CreateIcon />
                </Hidden>
            </Button>
            <AddTweetModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </li>
    );
};

export default AddTweetButton;
