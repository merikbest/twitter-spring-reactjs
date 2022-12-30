import {makeStyles, Theme} from "@material-ui/core";

export const useQuoteTweetModalStyles = makeStyles((theme: Theme) => ({
    content: {
        top: "-20%",
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
    header: {
        padding: "5px 15px",
        margin: 0,
    },
    dialogContent: {
        width: 598,
        minHeight: 230,
        padding: "10px 20px 15px 20px",
    },
}));
