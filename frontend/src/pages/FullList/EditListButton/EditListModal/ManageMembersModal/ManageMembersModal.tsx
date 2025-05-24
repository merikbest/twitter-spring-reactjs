import React, { ReactElement } from "react";
import { Dialog, DialogContent, DialogTitle, InputAdornment, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTranslation } from "react-i18next";

import { useManageMembersModalStyles } from "./ManageMembersModalStyles";
import ManageMembersItem from "./ManageMembersItem";
import { ArrowIcon, ForwardArrowIcon, SearchIcon } from "../../../../../icons";
import Spinner from "../../../../../components/Spinner/Spinner";
import { ManageMembersInput } from "./ManageMembersInput";
import EmptyPageDescription from "../../../../../components/EmptyPageDescription/EmptyPageDescription";
import { useGlobalStyles } from "../../../../../util/globalClasses";
import { useManageMembersModal } from "./useManageMembersModal";

const ManageMembersModal = (): ReactElement => {
    const globalClasses = useGlobalStyles({ dialogContentHeight: 577 });
    const classes = useManageMembersModalStyles();
    const { t } = useTranslation();
    const {
        list,
        members,
        suggested,
        isMembersLoading,
        activeTab,
        searchText,
        visibleModalWindow,
        onOpenModalWindow,
        onCloseModalWindow,
        handleChangeTab,
        onSearch,
    } = useManageMembersModal();

    return (
        <>
            <Typography
                id="onOpenManageMembersModal"
                className={classes.manageMembers}
                onClick={onOpenModalWindow}
                variant="body1"
                component="div"
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
