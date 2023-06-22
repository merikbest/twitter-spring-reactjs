import { makeStyles } from "@material-ui/core";

export const useChangeEmailModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialogContent-root": {
            paddingTop: 10
        },
        "& .MuiTypography-h3": {
            padding: "16px 0px"
        },
        "& .MuiTypography-subtitle1": {
            marginBottom: 20
        }
    },
    content: {
        width: 598,
        height: 650,
        position: "relative",
        overflowX: "hidden",
        padding: "0px 32px"
    },
    logoIcon: {
        margin: "0 auto",
        width: 53,
        "& svg": {
            height: "2.30em",
            color: theme.palette.primary.main
        }
    },
    infoWrapper: {
        marginTop: 38,
        display: "flex",
        justifyContent: "space-between"
    },
    selectWrapper: {
        marginBottom: 20,
        "& .MuiFormControl-root": {
            width: "100%"
        }
    },
    footer: {
        width: "100%",
        bottom: 0,
        position: "absolute",
        paddingRight: 64,
        paddingBottom: 36
    }
}));
