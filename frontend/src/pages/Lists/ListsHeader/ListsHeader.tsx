import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClickAwayListener, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useListsHeaderStyles } from "./ListsHeaderStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { AddListsIcon, EditIcon, ListsIcon } from "../../../icons";
import { LISTS_MEMBERSHIPS } from "../../../constants/path-constants";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import { selectIsLoading } from "../../../store/ducks/lists/selectors";
import { selectUserDataId, selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import CreateListsModal from "./CreateListsModal/CreateListsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import { useClickAway } from "../../../hook/useClickAway";

const ListsHeader = (): ReactElement => {
    const classes = useListsHeaderStyles();
    const isLoading = useSelector(selectIsLoading);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const myProfileId = useSelector(selectUserDataId);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { open, onClickOpen, onClickClose } = useClickAway();
    const { t } = useTranslation();

    return (
        <PageHeaderWrapper backButton>
            {!isLoading && (
                <div>
                    <Typography variant="h5" component="div">
                        {t("LISTS", { defaultValue: "Lists" })}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        @{myProfileUsername}
                    </Typography>
                </div>
            )}
            <div className={classes.iconGroup}>
                <ActionIconButton
                    onClick={onOpenModalWindow}
                    actionText={t("CREATE", { defaultValue: "Create" })}
                    icon={AddListsIcon}
                />
                <div className={classes.icon}>
                    <ClickAwayListener onClickAway={onClickClose}>
                        <div>
                            <ActionIconButton
                                onClick={onClickOpen}
                                actionText={t("MORE", { defaultValue: "More" })}
                                icon={EditIcon}
                            />
                            {open && (
                                <Link to={`${LISTS_MEMBERSHIPS}/${myProfileId}`} className={classes.dropdownLink}>
                                    <div className={classes.dropdown}>
                                        <span className={classes.textIcon}>
                                            {ListsIcon}
                                        </span>
                                        <Typography variant="body1" component="span">
                                            {t("LISTS_YOU_ARE_ON", { defaultValue: "Lists you’re on" })}
                                        </Typography>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
            <CreateListsModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </PageHeaderWrapper>
    );
};

export default ListsHeader;
