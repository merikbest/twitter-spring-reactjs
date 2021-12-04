import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

export const useChangeInfoTextFieldStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: 58,
            border: `1px solid ${theme.palette.grey[100]}`,
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            },
            '&$focused': {
                backgroundColor: theme.palette.background.paper,
                borderWidth: 2,
                borderColor: theme.palette.primary.main,
            },
        },
        error: {
            border: '1px solid rgb(224, 36, 94)',
            backgroundColor: theme.palette.background.paper,
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            },
            '&$focused': {
                backgroundColor: theme.palette.background.paper,
                border: '2px solid rgb(224, 36, 94)',
            },
        },
        disabled: {
            backgroundColor: theme.palette.grey[400],
            color: theme.palette.grey[500],
            border: `1px solid ${theme.palette.grey[400]}`, // TODO fix border
            '&:hover': {
                border: `1px solid ${theme.palette.grey[400]}`,
                backgroundColor: theme.palette.grey[400],
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
