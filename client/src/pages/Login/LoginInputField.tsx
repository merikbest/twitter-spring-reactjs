import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

export const useLoginTextFieldStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 334,
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
        focused: {},
    }),
);

export const LoginTextField = (props: TextFieldProps) => {
    const classes = useLoginTextFieldStyles();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}

