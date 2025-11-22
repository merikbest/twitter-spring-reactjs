import { makeStyles } from "@material-ui/core";

export const useEditBirthDateModalStyles = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialogContent-root": {
            padding: 32,
            width: 320
        },
        textAlign: "center"
    },
    text: {
        marginTop: 8,
        marginBottom: 24
    },
    editButton: {
        marginBottom: 12
    }
}));
