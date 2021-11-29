import {makeStyles, Theme} from "@material-ui/core";

export const useCreateAccountModalStyles = makeStyles((theme: Theme) => ({
    container: {
        width: 550,
        height: 600,
        marginTop: 5,
        padding: "0 30px",
    },
    title: {
        fontSize: 18,
        fontWeight: 800,
        marginBottom: 22,
        linHeight: "24px"
    },
    subtitle: {
        fontSize: 21,
        fontWeight: 700,
    },
    form: {
        "& .MuiFormControl-root": {
            marginTop: 24,
        },
    },
    text: {
        marginTop: 76,
        fontWeight: 400,
        fontSize: 15,
        linHeight: "20px",
        // "& span": {
        //     fontSize: 14,
        //     color: theme.palette.primary.main,
        //     "&:hover": {
        //         cursor: "pointer",
        //     },
        // },
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        }
    },
    button: {
        marginTop: 15,
        height: 46,
    },
}));
