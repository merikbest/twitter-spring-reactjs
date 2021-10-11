import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useTweetComponentMoreStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        position: 'relative',
        "& .MuiIconButton-root": {
            marginRight: (props: { isFullTweet: boolean }) => props.isFullTweet ? 0 : 8,
            width: 35,
            height: 35,
            color: "rgb(83, 100, 113)",
            "& .MuiIconButton-label": {
                "& span": {
                    height: 25,
                    "& svg": {
                        color: "rgb(83, 100, 113)",
                        height: "0.8em",
                    },
                },
            },
        },
    },
    dropdown: {
        padding: 0,
        position: 'absolute',
        width: 352,
        height: 312,
        top: 10,
        right: 10,
        zIndex: 2,
        borderRadius: 4,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& .MuiList-root": {
            padding: 0,
        },
        "& #delete": {
            color: "rgb(244, 33, 46)",
            "& svg": {
                verticalAlign: "bottom",
                marginRight: 15,
                height: "1.30em",
                fill: "rgb(244, 33, 46)",
            },
        },
        '& .MuiListItem-root': {
            height: 52,
            fontSize: 15,
            fontWeight: 400,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgb(247, 249, 249)',
            },
            "& svg": {
                verticalAlign: "bottom",
                marginRight: 15,
                fill: "rgb(83, 100, 113)",
                height: "1.30em",
            },
        },
    },
    snackBar: {
        "& .MuiSnackbarContent-root": {
            minWidth: 179,
            height: 44,
            padding: "0px 10px",
            backgroundColor: "rgb(29, 161, 242)",
            "& .MuiSnackbarContent-message": {
                fontSize: 15,
                margin: "0 auto",
                textAlign: "center",
            },
        },
    },
}));
