import { makeStyles } from "@material-ui/core";

export const useEditBirthDateStyles = makeStyles((theme) => ({
    editBirthDateWrapper: {
        marginBottom: 64,
        marginLeft: 15
    },
    description: {
        padding: "4px 0px"
    },
    cancel: {
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    },
    formControl: {
        margin: "16px 0"
    }
}));
