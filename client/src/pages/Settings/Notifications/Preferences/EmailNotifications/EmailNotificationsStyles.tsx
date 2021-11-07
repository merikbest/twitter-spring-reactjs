import {makeStyles, Theme} from "@material-ui/core";
import EmailNotifications from "./EmailNotifications";

export const useEmailNotificationsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    itemTitle: {
        paddingBottom: 4,
        fontWeight: 700,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        lineHeight: "20px"
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    link: {
        textDecoration: "none",
        color: "rgb(29, 155, 240)",
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    divider: {
        height: 1,
        backgroundColor: "rgb(239, 243, 244)",
    },
    title: {
        fontSize: 20,
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        lineHeight: "24px",
    },
    subtitle: {
        fontWeight: 700,
        fontSize: 15,
        lineHeight: "20px",
        color: "rgb(15, 20, 25)",
    },
    infoItem: {
        paddingBottom: 12,
        fontSize: 15,
        color: "rgb(15, 20, 25)",
        fontWeight: 400,
        lineHeight: "20px",
        "& .MuiCheckbox-root": {
            float: "right",
            marginTop: -10,
        },
    },
    emailNotificationsItemWrapper: {
        padding: "4px 0px",
        "& .MuiTypography-root": {
            fontSize: 15,
            color: "rgb(15, 20, 25)",
            fontWeight: 400,
            lineHeight: "20px",
        },
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
}));
