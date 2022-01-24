import {makeStyles, Theme} from "@material-ui/core";

export const useAccountStyles = makeStyles((theme: Theme) => ({
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
    icon: {
        margin: "15px 30px 15px 15px",
    },
}));
