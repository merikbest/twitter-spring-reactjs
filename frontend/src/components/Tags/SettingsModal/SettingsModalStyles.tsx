import {makeStyles, Theme} from "@material-ui/core";

export const useSettingsModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    content: {
        height: 550,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
}));