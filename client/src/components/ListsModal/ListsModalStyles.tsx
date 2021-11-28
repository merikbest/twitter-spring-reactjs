import {makeStyles, Theme} from "@material-ui/core";

export const useListsModalStyles = makeStyles<Theme>((theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
            borderBottom: "1px solid rgb(239, 243, 244)"
        },
    },
    content: {
        height: 600,
        width: 598,
        padding: "0px 0px",
        overflowX: "hidden",
    },
    button: {
        marginLeft: "auto",
        height: 30,
    },
    createList: {
        width: "100%",
        padding: "12px 16px",
        fontSize: 15,
        color: "rgb(27, 149, 224)",
        borderBottom: "1px solid rgb(239, 243, 244)",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "rgb(245, 248, 250)",
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
                    color: "rgba(29, 161, 242, 1.00)",
                    height: "1.30em",
                },
            },
        },
        "& .Mui-selected": {
            backgroundColor: theme.palette.info.main,
        },
    },
}));
