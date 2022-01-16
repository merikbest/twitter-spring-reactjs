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
    list: {
        "& .MuiList-root": {
            padding: 0,
        },
        "& .MuiListItem-root": {
            fontWeight: 700,
            fontSize: 15,
            padding: "12px 16px",
            justifyContent: "space-between",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.03)"
            },
            "& span": {
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
            backgroundColor: theme.palette.common.white,
        },
    },
}));
