import {makeStyles, Theme} from "@material-ui/core";

export const useDisplayModalStyles = makeStyles((theme: Theme) => ({
    dialog: {
        "& .MuiDialogTitle-root": {
            padding: "5px 15px",
            marginBottom: 0,
        },
    },
    content: {
        height: 603,
        width: 598,
        padding: "0px 32px 32px 32px",
        overflowX: "hidden",
    },
    title: {
        marginTop: 32,
        marginBottom: 12,
        color: theme.palette.text.primary,
        textAlign: "center",
        lineHeight: "28px",
        fontSize: 23,
        fontWeight: 800,
    },
    text: {
        marginBottom: 20,
        color: theme.palette.text.secondary,
        textAlign: "center",
        lineHeight: "20px",
        fontSize: 15,
        fontWeight: 400,
    },
    tweetInfoWrapper: {
        display: "flex",
        justifyContent: "flex-start",
        margin: "0px auto 16px auto",
        padding: "16px 12px",
        width: 455,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 16,
    },
    tweetIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        backgroundColor: theme.palette.primary.main,
        borderRadius: "50%",
    },
    tweetIcon: {
        marginTop: 5,
        "& svg": {
            color: theme.palette.common.white,
            height: "1.7em"
        },
    },
    tweetTitle: {
        marginRight: 3,
        fontWeight: 700,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px"
    },
    tweetVerifiedIcon: {
        marginRight: 3,
        "& svg": {
            verticalAlign: "bottom",
            color: theme.palette.primary.main,
            height: "1.35em"
        },
    },
    tweetInfoText: {
        fontWeight: 400,
        fontSize: 15,
        color: theme.palette.text.secondary,
        lineHeight: "20px"
    },
    tweetText: {
        fontWeight: 400,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px",
        "&#xs": {
            fontSize: 13,
        },
        "&#xl": {
            fontSize: 20,
        },
    },
    tweetLink: {
        color: theme.palette.primary.main,
    },
    subtitle: {
        color: theme.palette.text.secondary,
        fontSize: 13,
        marginBottom: 4,
        fontWeight: 700,
        lineHeight: "20px",
    },
    stepperWrapper: {
        display: "flex",
        alignItems: "center",
        padding: 16,
        marginBottom: 12,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 16,
    },
    stepper: {
        position: "relative",
        width: "100%",
        height: 4,
        margin: "0px 20px",
        backgroundColor: theme.palette.primary.light,
    },
    stepperPoint: {
        marginTop: -3,
        position: "absolute",
        verticalAlign: "baseline",
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "rgb(101 119 134 / 20%) 0px 0px 7px, rgb(101 119 134 / 15%) 0px 1px 3px 1px",
        "&#xs": {
            marginLeft: "1%",
        },
        "&#sm": {
            marginLeft: "24%",
        },
        "&#md": {
            marginLeft: "49%",
        },
        "&#lg": {
            marginLeft: "74%",
        },
        "&#xl": {
            marginLeft: "97%",
        },
    },
    colorWrapper: {
        display: "flex",
        justifyContent: "space-around",
        padding: "8px 0px",
        marginBottom: 12,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 16,
    },
    colorItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 45,
        height: 45,
        borderRadius: "50%",
        cursor: "pointer",
        "&#blue": {
            backgroundColor: "rgb(29, 155, 240)",
        },
        "&#yellow": {
            backgroundColor: "rgb(255, 212, 0)",
        },
        "&#crimson": {
            backgroundColor: "rgb(249, 24, 128)",
        },
        "&#violet": {
            backgroundColor: "rgb(120, 86, 255)",
        },
        "&#orange": {
            backgroundColor: "rgb(255, 122, 0)",
        },
        "&#green": {
            backgroundColor: "rgb(0, 186, 124)",
        },
    },
    checkIcon: {
        marginTop: 5,
        "& svg": {
            color: theme.palette.common.white,
            height: "1.9em"
        },
    },
    backgroundContainer: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 16,
        padding: "4px 12px"
    },
    backgroundWrapper: {
        display: "inline-block",
    },
    backgroundItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: 156,
        height: 60,
        padding: "0px 20px",
        margin: 4,
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: 4,
        cursor: "pointer",
        "&#default": {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        "&#dim": {
            backgroundColor: "rgb(21, 32, 43)",
            color: theme.palette.common.white,
        },
        "&#lights-out": {
            backgroundColor: "rgb(0, 0, 0)",
            color: "rgb(217, 217, 217)",
        },
    },
    backgroundItemWrapper: {
        padding: "4px 0px",
        "& .MuiTypography-root": {
            fontSize: 15,
            color: theme.palette.text.primary,
            fontWeight: 400,
            lineHeight: "20px",
        },
        "& .MuiButtonBase-root": {
            padding: 4,
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
    backgroundItemText: {
        width: "100%",
        fontWeight: 700,
        fontSize: 15,
        lineHeight: "20px",
        textAlign: "center"
    },
    buttonWrapper: {
        marginTop: 38,
        width: 67,
        margin: "0px auto",
    },
}));
