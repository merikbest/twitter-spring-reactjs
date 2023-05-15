import { makeStyles } from "@material-ui/core";

export const useFollowerRequestsModalStyles = makeStyles(() => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            borderBottom: "none"
        }
    },
    content: {
        height: 550,
        width: 598,
        padding: 0,
        overflowX: "hidden"
    }
}));
