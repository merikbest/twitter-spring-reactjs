import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

export const useChangeInfoTextFieldStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: 58,
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fff',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                borderColor: theme.palette.primary.main,
            },
        },
        disabled: {
            backgroundColor: "rgb(247, 249, 249)",
            color: "#849099",
            '&:hover': {
                backgroundColor: "rgb(247, 249, 249)",
            },
        },
        focused: {},
    }),
);

export const ChangeInfoTextField = (props: TextFieldProps) => {
    const classes = useChangeInfoTextFieldStyles();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}
