import {makeStyles} from "@material-ui/core";

export const useTweetInputStyles = makeStyles((theme) => ({
    container: {
        marginLeft: 15,
        marginBottom: 25,
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        width: 560,
        height: 22,
    },
    inputLabel: {
        display: "inline",
        position: "relative",
        "& .MuiInputLabel-outlined": {
            transform: "translate(11px, 27px) scale(1)",
        },
    },
    inputCount: {
        display: "inline",
        position: "relative",
        "& .MuiInputLabel-outlined": {
            transform: "translate(-15px, 27px) scale(1)",
        },
        "& .MuiInputLabel-formControl": {
            position: "relative",
        },
    },
}));
