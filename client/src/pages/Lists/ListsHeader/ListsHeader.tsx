import React, {ReactElement, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ClickAwayListener, Typography} from "@material-ui/core";

import {useListsHeaderStyles} from "./ListsHeaderStyles";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {AddListsIcon, EditIcon, ListsIcon} from "../../../icons";
import {LISTS_MEMBERSHIPS} from "../../../util/pathConstants";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import {selectIsLoading} from "../../../store/ducks/lists/selectors";
import {selectUserDataId, selectUserProfileUsername} from "../../../store/ducks/user/selectors";
import CreateListsModal from "./CreateListsModal/CreateListsModal";

const ListsHeader = (): ReactElement => {
    const classes = useListsHeaderStyles();
    const isLoading = useSelector(selectIsLoading);
    const myProfileUsername = useSelector(selectUserProfileUsername);
    const myProfileId = useSelector(selectUserDataId);
    const [visibleCreateListModal, setVisibleCreateListModal] = useState<boolean>(false);
    const [openPopover, setOpenPopover] = useState<boolean>(false);

    const onOpenCreateListModal = (): void => {
        setVisibleCreateListModal(true);
    };

    const onCloseCreateListModal = (): void => {
        setVisibleCreateListModal(false);
    };

    const handleClick = (): void => {
        setOpenPopover((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpenPopover(false);
    };

    return (
        <PageHeaderWrapper backButton>
            {!isLoading && (
                <div>
                    <Typography variant="h5" component={"div"}>
                        Lists
                    </Typography>
                    <Typography variant="subtitle2" component={"div"}>
                        @{myProfileUsername}
                    </Typography>
                </div>
            )}
            <div className={classes.iconGroup}>
                <ActionIconButton onClick={onOpenCreateListModal} actionText={"Create"} icon={AddListsIcon}/>
                <div className={classes.icon}>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <div>
                            <ActionIconButton onClick={handleClick} actionText={"More"} icon={EditIcon}/>
                            {openPopover && (
                                <Link to={`${LISTS_MEMBERSHIPS}/${myProfileId}`} className={classes.dropdownLink}>
                                    <div className={classes.dropdown}>
                                        <span className={classes.textIcon}>
                                            {ListsIcon}
                                        </span>
                                        <Typography variant={"body1"} component={"span"}>
                                            Lists you’re on
                                        </Typography>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
            <CreateListsModal visible={visibleCreateListModal} onClose={onCloseCreateListModal}/>
        </PageHeaderWrapper>
    );
};

export default ListsHeader;
