import React, {ChangeEvent, FC, ReactElement, useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {useManageMembersModalStyles} from "./ManageMembersModalStyles";
import {Lists} from "../../../../store/ducks/lists/contracts/state";
import ManageMembersItem from "./ManageMembersItem/ManageMembersItem";
import ManageMembersSuggested from "./ManageMembersSuggested/ManageMembersSuggested";
import {ArrowIcon} from "../../../../icons";
import {useSelector} from "react-redux";
import {selectListItem} from "../../../../store/ducks/list/selectors";

interface ManageMembersModalProps {
    visible?: boolean;
    onClose: () => void;
}

const ManageMembersModal: FC<ManageMembersModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useManageMembersModalStyles();
    const list = useSelector(selectListItem);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
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
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <>{ArrowIcon}</>
                </IconButton>
                Manage members
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.tabs}>
                    <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChangeTab}>
                        <Tab className={classes.tab} label={`Members (${list?.members.length})`}/>
                        <Tab className={classes.tab} label="Suggested"/>
                    </Tabs>
                </div>
                {(activeTab === 0) && (list?.members.map((member) => <ManageMembersItem item={list} member={member}/>))}
                {(activeTab === 1) && (<ManageMembersSuggested/>)}
            </DialogContent>
        </Dialog>
    );
};

export default ManageMembersModal;
