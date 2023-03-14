import React, { ReactElement, useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import TwitterIcon from "@material-ui/icons/Twitter";
import Typography from "@material-ui/core/Typography";
import { Button, ListItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { useHistory } from "react-router-dom";

import { useLogoutModalStyles } from "./LogoutModalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfileUsername } from "../../../store/ducks/user/selectors";
import { signOut } from "../../../store/ducks/user/actionCreators";
import { ACCOUNT_SIGNIN } from "../../../constants/path-constants";
import { TOKEN } from "../../../constants/common-constants";

const LogoutModal = (): ReactElement => {
    const classes = useLogoutModalStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(selectUserProfileUsername);
    const [visibleLogoutModal, setVisibleLogoutModal] = useState<boolean>(false);

    const handleSignOut = (): void => {
        window.localStorage.removeItem(TOKEN);
        dispatch(signOut());
        history.push(ACCOUNT_SIGNIN);
    };

    const onOpenLogoutModal = (): void => {
        setVisibleLogoutModal(true);
    };

    const onCloseLogoutModal = (): void => {
        setVisibleLogoutModal(false);
    };

    return (
        <>
            <ListItem id={"onOpenLogoutModal"} onClick={onOpenLogoutModal}>
                <Typography variant="body1" component="div">
                    Log out @{username}
                </Typography>
            </ListItem>
            <Dialog open={visibleLogoutModal} onClose={onCloseLogoutModal}>
                <DialogContent style={{ padding: 0 }}>
                    <div className={classes.modalWrapper}>
                        <TwitterIcon />
                        <Typography variant={"h5"} component={"div"}>
                            Log out of Twitter?
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            You can always log back in at any time. If you just want to switch accounts,
                            you can do that by adding an existing account.
                        </Typography>
                        <div className={classes.modalButtonWrapper}>
                            <Button
                                className={classes.modalCancelButton}
                                onClick={onCloseLogoutModal}
                                variant="contained"
                                size="large"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSignOut}
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default LogoutModal;
