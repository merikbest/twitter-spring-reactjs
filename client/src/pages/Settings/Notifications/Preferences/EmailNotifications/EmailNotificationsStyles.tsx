import {makeStyles, Theme} from "@material-ui/core";

export const useEmailNotificationsStyles = makeStyles((theme: Theme) => ({
    infoItemWrapper: {
        padding: "12px 16px"
    },
    text: {
        color: theme.palette.text.secondary,
        fontWeight: 400,
        fontSize: 13,
        lineHeight: "16px"
    },
    itemTitle: {
        paddingBottom: 4,
        fontWeight: 700,
        fontSize: 15,
        color: theme.palette.text.primary,
        lineHeight: "20px"
    },
    switch: {
        marginTop: -9,
        float: "right",
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    title: {
        fontSize: 20,
        color: theme.palette.text.primary,
        fontWeight: 800,
        lineHeight: "24px",
    },
    subtitle: {
        fontWeight: 700,
        fontSize: 15,
        lineHeight: "20px",
        color: theme.palette.text.primary,
    },
    infoItem: {
        paddingBottom: 12,
        fontSize: 15,
        color: theme.palette.text.primary,
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
            color: theme.palette.text.primary,
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
