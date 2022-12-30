import {createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps, Theme} from "@material-ui/core";

const useStylesPoll = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
                borderColor: "transparent",
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
            },
        },
        focused: {},
        error: {
            border: '1px solid rgb(224, 36, 94)',
            backgroundColor: theme.palette.common.white,
            '&:hover': {
                backgroundColor: theme.palette.common.white,
            },
            '&$focused': {
                backgroundColor: theme.palette.common.white,
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgb(224, 36, 94)",
            },
        },
        disabled: {
            backgroundColor: theme.palette.common.white,
            color: "#849099",
            '&:hover': {
                backgroundColor: theme.palette.common.white,
            },
        },
    }),
);

export const PollInputField = (props: TextFieldProps) => {
    const classes = useStylesPoll();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
}
