import { makeStyles } from "@material-ui/core";

export const useRegistrationInputStyles = makeStyles(() => ({
    container: {
        marginBottom: 20
    },
    content: {
        fontSize: 3,
        float: "right",
        display: "flex",
        marginTop: -9,
        marginRight: 20
    },
    inputCount: {
        display: "inline",
        "& .MuiInputLabel-formControl": {
            position: "relative"
        }
    }
}));
