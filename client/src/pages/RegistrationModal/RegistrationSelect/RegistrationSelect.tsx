import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

const useStylesRegistration = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgb(29, 161, 242)",
            },
        },
        focused: {},
    }),
);

export const RegistrationSelect = (props: TextFieldProps) => {
    const classes = useStylesRegistration();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}
