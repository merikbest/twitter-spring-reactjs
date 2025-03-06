import React, { ChangeEvent, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";

import { useManageMembersModalStyles } from "./ManageMembersModalStyles";
import ManageMembersItem from "./ManageMembersItem/ManageMembersItem";
import { ArrowIcon, ForwardArrowIcon, SearchIcon } from "../../../../../icons";
import { selectListItem } from "../../../../../store/ducks/list/selectors";
import {
    selectIsListMembersLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "../../../../../store/ducks/listMembers/selectors";
import {
    fetchListMembers,
    fetchListMembersByUsername,
    resetListMembersState,
    resetListSuggested
} from "../../../../../store/ducks/listMembers/actionCreators";
import Spinner from "../../../../../components/Spinner/Spinner";
import { ManageMembersInput } from "./ManageMembersInput/ManageMembersInput";
import EmptyPageDescription from "../../../../../components/EmptyPageDescription/EmptyPageDescription";
import { useModalWindow } from "../../../../../hook/useModalWindow";
import { useGlobalStyles } from "../../../../../util/globalClasses";

const ManageMembersModal = (): ReactElement => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 577 });
    const classes = useManageMembersModalStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const members = useSelector(selectListMembersItems);
    const suggested = useSelector(selectListSuggestedItems);
    const isMembersLoading = useSelector(selectIsListMembersLoading);
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [searchText, setSearchText] = React.useState<string>("");
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    useEffect(() => {
        if (visibleModalWindow) {
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }

        return () => {
            dispatch(resetListMembersState());
            dispatch(resetListSuggested());
        };
    }, [visibleModalWindow]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);

        if (newValue === 0) {
            setSearchText("");
            dispatch(resetListSuggested());
            dispatch(fetchListMembers({ listId: list?.id!, listOwnerId: list?.listOwner.id! }));
        }
    };

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchListMembersByUsername({ listId: list?.id!, username: encodeURIComponent(text) }));
        } else {
            setSearchText("");
            dispatch(resetListSuggested());
        }
    };

    return (
        <>
            <Typography
                id={"onOpenManageMembersModal"}
                className={classes.manageMembers}
                onClick={onOpenModalWindow}
                variant={"body1"}
                component={"div"}
            >
                {t("MANAGE_MEMBERS", { defaultValue: "Manage members" })}
                <>{ForwardArrowIcon}</>
            </Typography>
            <Dialog
                className={classes.dialog}
                open={visibleModalWindow}
                onClose={onCloseModalWindow}
                hideBackdrop
            >
                <DialogTitle>
                    <IconButton onClick={onCloseModalWindow} color="primary" size="small">
                        <>{ArrowIcon}</>
                    </IconButton>
                    {t("MANAGE_MEMBERS", { defaultValue: "Manage members" })}
                </DialogTitle>
                <DialogContent className={globalClasses.dialogContent}>
                    <div className={classes.tabs}>
                        <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                            <Tab
                                className={classes.tab}
                                label={t("MEMBERS_SIZE", {
                                    membersSize: list?.membersSize,
                                    defaultValue: `Members (${list?.membersSize})`
                                })}
                            />
                            <Tab
                                className={classes.tab}
                                label={t("SUGGESTED", { defaultValue: "Suggested" })}
                            />
                        </Tabs>
                    </div>
                    {(activeTab === 0) ? (
                        isMembersLoading ? (
                            <Spinner />
                        ) : (
                            (members.length !== 0) ? (
                                members.map((member) => (
                                    <ManageMembersItem
                                        key={member.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={member}
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={t("EMPTY_MEMBERS_IN_LIST_TITLE", {
                                        defaultValue: "There isn’t anyone in this List" })}
                                    subtitle={t("EMPTY_MEMBERS_IN_LIST_DESCRIPTION", {
                                        defaultValue: "When people get added, they’ll show up here." })}
                                />
                            )
                        )
                    ) : (
                        <div className={classes.container}>
                            <ManageMembersInput
                                fullWidth
                                placeholder={t("SEARCH_PEOPLE", { defaultValue: "Search people" })}
                                variant="outlined"
                                onChange={(event) => onSearch(event.target.value)}
                                value={searchText}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {SearchIcon}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {(suggested.length !== 0) ? (
                                suggested.map((suggest) => (
                                    <ManageMembersItem
                                        key={suggest.id}
                                        listId={list?.id}
                                        listOwnerId={list?.listOwner.id}
                                        user={suggest}
                                        isSuggested
                                    />
                                ))
                            ) : (
                                <EmptyPageDescription
                                    title={t("EMPTY_SUGGESTED_MEMBERS_TITLE", {
                                        defaultValue: "There aren’t any suggested members" })}
                                    subtitle={t("EMPTY_SUGGESTED_MEMBERS_DESCRIPTION", {
                                        defaultValue: "To see suggestions to add to this List, try searching for accounts." })}
                                />
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ManageMembersModal;
