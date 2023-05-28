import { makeStyles, TextFieldProps, Theme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField/TextField";

interface MainSearchTextFieldProps {
    marginTop?: number;
    width?: number;
}

const useMainSearchTextFieldStyles = makeStyles<Theme, MainSearchTextFieldProps>((theme) => ({
    root: {
        "& .MuiOutlinedInput-root": {
            borderRadius: 30,
            padding: 19,
            height: 20,
            width: props => props.width ?? 450,
            marginTop: props => props.marginTop ?? 6,
            "&.Mui-focused": {
                backgroundColor: theme.palette.background.paper,
                "& fieldset": { borderWidth: 1, borderColor: theme.palette.primary.main },
                "& svg path": {
                    fill: theme.palette.primary.main
                }
            },
            "& .MuiInputAdornment-root": {
                "& svg": {
                    color: theme.palette.text.secondary,
                    height: "1.25em"
                }
            },
            "&:hover": {
                "& fieldset": { borderColor: "transparent" }
            },
            "& fieldset": {
                borderColor: "transparent",
                borderWidth: 1
            }
        },
        "& .MuiOutlinedInput-input": {
            padding: "12px 14px 14px 5px"
        }
    }
}));

export const MainSearchTextField = (props: TextFieldProps & MainSearchTextFieldProps) => {
    const classes = useMainSearchTextFieldStyles(props);

    return (
        <TextField className={classes.root} {...props} />
    );
};

