import {makeStyles, Theme} from "@material-ui/core";

export const useAccountInformationStyles = makeStyles((theme: Theme) => ({
    listWrapper: {
        "& a": {
            textDecoration: "none",
            cursor: "pointer",
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
        "& svg": {
            color: theme.palette.text.secondary,
            height: "1.3em",
        },
    },
    arrowIcon: {
        marginLeft: "auto"
    },
    informationItem: {
        padding: "12px 16px",
    },
}));
