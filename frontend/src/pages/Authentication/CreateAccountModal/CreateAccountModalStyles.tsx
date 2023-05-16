import { makeStyles } from "@material-ui/core";

export const useCreateAccountModalStyles = makeStyles(() => ({
    title: {
        fontSize: 18,
        fontWeight: 800,
        marginBottom: 22,
        linHeight: "24px"
    },
    subtitle: {
        fontWeight: 700
    },
    form: {
        "& .MuiFormControl-root": {
            marginTop: 24
        }
    },
    text: {
        marginTop: 76,
        marginBottom: 15
    }
}));
