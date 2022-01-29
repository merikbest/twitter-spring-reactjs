import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useChangeReplyWindowStyles = makeStyles((theme: Theme) => createStyles({
    dropdown: {
        width: 320,
        zIndex: 2,
        borderRadius: 16,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px",
        "& #lastItem": {
            borderRadius: "0px 0px 16px 16px",
        },
    },
    infoWrapper: {
        padding: "16px 16px 12px 16px",
        "& .MuiTypography-root": {
            textAlign: "center"
        },
    },
    listItem: {
        height: 60,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
        "&.MuiListItem-button": {
            "&:hover": {
                backgroundColor: theme.palette.secondary.main,
            },
        },
    },
    iconCircle: {
        marginRight: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
    },
    icon: {
        "& svg": {
            marginTop: 5,
            height: "1.35em",
            fill: theme.palette.common.white,
        },
    },
    checkIcon: {
        marginLeft: "auto",
        "& svg": {
            color: theme.palette.primary.main,
            marginTop: 5,
            height: "1.3em",
        },
    },
}));
