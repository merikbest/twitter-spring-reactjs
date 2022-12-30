import {makeStyles, Theme} from "@material-ui/core";

export const useUsersListModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            margin: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
    },
}));
