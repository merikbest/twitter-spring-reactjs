import { makeStyles, Theme } from "@material-ui/core";

interface MutedAccountItemStylesProps {
    isUserMuted: boolean;
}

export const useMuteAccountButtonStyles = makeStyles<Theme, MutedAccountItemStylesProps>((theme) => ({
    muteButton: {
        marginRight: 16,
        "& .MuiIconButton-root": {
            padding: 7,
            borderColor: props => props.isUserMuted ? theme.palette.error.light : "rgb(207, 217, 222)",
            border: "1px solid",
            borderRadius: "50%",
            "& svg": {
                color: props => props.isUserMuted ? theme.palette.error.main : theme.palette.primary.main,
                height: "0.85em"
            },
            "&:hover": {
                backgroundColor: props => props.isUserMuted ? "rgba(244, 33, 46, 0.1)" : "rgba(29, 155, 240, 0.1)"
            }
        }
    }
}));
