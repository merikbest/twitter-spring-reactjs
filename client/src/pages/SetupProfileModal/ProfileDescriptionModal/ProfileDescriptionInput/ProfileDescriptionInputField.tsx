import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

const useStylesRegistration = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '1px solid #C4C4C4',
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
        error: {
            border: '1px solid rgb(224, 36, 94)',
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgb(224, 36, 94)",
            },
        },
        disabled: {
            backgroundColor: '#fff',
            color: "#849099",
            '&:hover': {
                backgroundColor: '#fff',
            },
        },
    }),
);

export const ProfileDescriptionInputField = (props: TextFieldProps) => {
    const classes = useStylesRegistration();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}
