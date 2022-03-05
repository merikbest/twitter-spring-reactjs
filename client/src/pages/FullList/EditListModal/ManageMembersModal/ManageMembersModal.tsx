import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dialog, DialogContent, DialogTitle, InputAdornment, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {useManageMembersModalStyles} from "./ManageMembersModalStyles";
import ManageMembersItem from "./ManageMembersItem/ManageMembersItem";
import {ArrowIcon, SearchIcon} from "../../../../icons";
import {selectListItem} from "../../../../store/ducks/list/selectors";
import {
    selectIsListMembersLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "../../../../store/ducks/listMembers/selectors";
import {
    fetchListMembers,
    fetchListMembersByUsername,
    resetListMembersState,
    resetListSuggested
} from "../../../../store/ducks/listMembers/actionCreators";
import Spinner from "../../../../components/Spinner/Spinner";
import {ManageMembersInput} from "./ManageMembersInput/ManageMembersInput";
import {useGlobalStyles} from "../../../../util/globalClasses";

interface ManageMembersModalProps {
    visible?: boolean;
    onClose: () => void;
}

const ManageMembersModal: FC<ManageMembersModalProps> = ({visible, onClose}): ReactElement | null => {
    const globalClasses = useGlobalStyles();
    const classes = useManageMembersModalStyles();
    const dispatch = useDispatch();
    const list = useSelector(selectListItem);
    const members = useSelector(selectListMembersItems);
    const suggested = useSelector(selectListSuggestedItems);
    const isMembersLoading = useSelector(selectIsListMembersLoading);
    const [searchText, setSearchText] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        if (visible) {
            dispatch(fetchListMembers({listId: list?.id!, listOwnerId: list?.listOwner.id!}));
        }

        return () => {
            dispatch(resetListMembersState());
        };
    }, [visible]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);

        if (newValue === 0) {
            dispatch(fetchListMembers({listId: list?.id!, listOwnerId: list?.listOwner.id!}));
        }
    };

    const onSearch = (text: string): void => {
        if (text) {
            setSearchText(text);
            dispatch(fetchListMembersByUsername({listId: list?.id!, username: encodeURIComponent(text)}));
        } else {
            setSearchText("");
            dispatch(resetListSuggested());
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            className={classes.dialog}
            open={visible}
            onClose={onClose}
            hideBackdrop={true}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="primary" size="small">
                    <>{ArrowIcon}</>
                </IconButton>
                Manage members
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label={`Members (${list?.membersSize})`}/>
                        <Tab className={classes.tab} label="Suggested"/>
                    </Tabs>
                </div>
                {(activeTab === 0) ? (
                    isMembersLoading ? <Spinner/> : (
                        (members.length !== 0) ? (
                            members.map((member) => (
                                <ManageMembersItem key={member.id} item={list} member={member}/>
                            ))
                        ) : (
                            <div className={globalClasses.infoText}>
                                <Typography variant={"h4"} component={"div"}>
                                    There isn’t anyone in this List
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    When people get added, they’ll show up here.
                                </Typography>
                            </div>
                        )
                    )
                ) : (
                    <div className={classes.container}>
                        <ManageMembersInput
                            fullWidth
                            placeholder="Search people"
                            variant="outlined"
                            onChange={(event) => onSearch(event.target.value)}
                            value={searchText}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SearchIcon}
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {(suggested.length !== 0) ? (
                            suggested.map((member) => (
                                <ManageMembersItem key={member.id} item={list} member={member}/>
                            ))
                        ) : (
                            <div className={globalClasses.infoText}>
                                <Typography variant={"h4"} component={"div"}>
                                    There aren’t any suggested members
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"}>
                                    To see suggestions to add to this List, try searching for accounts.
                                </Typography>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ManageMembersModal;
