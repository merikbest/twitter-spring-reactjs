import {makeStyles, Theme} from "@material-ui/core";

export const useListsModalStyles = makeStyles<Theme>((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: `1px solid ${theme.palette.divider}`,
            "& .MuiButton-root": {
                marginLeft: "auto",
            },
        },
    },
    content: {
        height: 600,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    createList: {
        width: "100%",
        padding: "12px 16px",
        color: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
        },
    },
    listAvatar: {
        width: "48px !important",
        height: "48px !important",
        borderRadius: "12px !important",
        marginRight: 15,
    },
    list: {
        "& .MuiListItem-root": {
            "& .MuiTypography-body1": {
                fontWeight: 700,
                fontSize: 15,
            },
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.03)"
            },
            "& #check": {
                position: "absolute",
                right: 0,
                marginRight: 16,
                "& svg" : {
                    color: theme.palette.primary.main,
                    height: "1.30em",
                },
            },
        },
        "& .Mui-selected": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    lockIcon: {
        "& svg": {
            marginLeft: 3,
            marginBottom: -3,
            height: "1.2em",
        },
    },
}));
