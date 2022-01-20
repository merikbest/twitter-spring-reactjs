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
        fontWeight: 700,
    },
    form: {
        "& .MuiFormControl-root": {
            marginTop: 24,
        },
    },
    text: {
        marginTop: 76,
    },
    button: {
        marginTop: 15,
    },
}));
