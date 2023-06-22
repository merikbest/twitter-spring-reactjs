import { createStyles, makeStyles, OutlinedInputProps, TextField, TextFieldProps } from "@material-ui/core";

const useStylesRegistration = makeStyles((theme) =>
    createStyles({
        root: {
            border: `1px solid ${theme.palette.divider}`,
            overflow: "hidden",
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create(["border-color", "box-shadow"]),
            "&:hover": {
                backgroundColor: theme.palette.background.paper
            },
            "&$focused": {
                backgroundColor: theme.palette.background.paper,
                borderColor: "transparent",
                boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
            }
        },
        focused: {},
        error: {
            border: "1px solid rgb(224, 36, 94)",
            backgroundColor: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.common.white
            },
            "&$focused": {
                backgroundColor: theme.palette.common.white,
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgb(224, 36, 94)"
            }
        },
        disabled: {
            backgroundColor: theme.palette.common.white,
            color: "#849099",
            "&:hover": {
                backgroundColor: theme.palette.common.white
            }
        }
    })
);

export const ProfileDescriptionInputField = (props: TextFieldProps) => {
    const classes = useStylesRegistration();

    return (
        <TextField
            InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>}
            {...props}
        />
    );
};
