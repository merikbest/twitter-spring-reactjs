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
        "& span": {
            fontSize: 14,
            color: "rgb(27, 149, 224)",
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    button: {
        marginTop: 15,
        height: 46,
    },
}));
