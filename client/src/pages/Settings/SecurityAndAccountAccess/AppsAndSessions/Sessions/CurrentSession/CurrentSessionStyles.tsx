import {makeStyles, Theme} from "@material-ui/core";

export const useCurrentSessionStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    title: {
        fontWeight: 800,
        lineHeight: "24px",
        fontSize: 20,
        color: "rgb(15, 20, 25)",
    },
    text: {
        fontSize: 13,
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        lineHeight: "16px",
    },
    sessionInfo: {
        display: "inline-flex",
        justifyContent: "flex-start"
    },
    OSTypeText: {
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
    },
    active: {
        padding: "1px 4px",
        backgroundColor: "rgb(29, 155, 240)",
        borderRadius: 4,
        height: 20,
        color: "#fff",
        fontSize: 13,
        lineHeight: "16px",
    },
    deviceIconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 16,
        width: 48,
        height: 48,
        border: "1px solid rgb(229, 234, 236)",
        borderRadius: "50%",
    },
    deviceIcon: {
        "& svg": {
            color: "rgb(15, 20, 25)",
            height: "1.7em"
        },
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
}));
