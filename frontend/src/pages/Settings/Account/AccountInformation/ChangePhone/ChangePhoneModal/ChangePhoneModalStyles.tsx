import { makeStyles } from "@material-ui/core";

export const useChangePhoneModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialogContent-root": {
            paddingTop: 10
        }
    },
    content: {
        width: 598,
        height: 650,
        position: "relative",
        overflowX: "hidden",
        padding: "0px 32px",
        "& .MuiTypography-h3": {
            padding: "16px 0px"
        },
        "& .MuiTypography-subtitle1, .MuiTypography-body1": {
            marginBottom: 20
        }
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
