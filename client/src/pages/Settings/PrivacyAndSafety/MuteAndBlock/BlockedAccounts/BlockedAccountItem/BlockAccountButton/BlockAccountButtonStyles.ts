import {makeStyles, Theme} from "@material-ui/core";

interface BlockAccountButtonStylesProps {
    isUserBlocked: boolean;
}

export const useBlockAccountButtonStyles = makeStyles<Theme, BlockAccountButtonStylesProps>((theme) => ({
    blockButton: {
        marginRight: 16,
        "& .MuiButtonBase-root": {
            color: props => props.isUserBlocked ? theme.palette.common.white : theme.palette.error.main,
            backgroundColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.common.white,
            border: "1px solid",
            borderColor: props => props.isUserBlocked ? theme.palette.error.main : theme.palette.error.light,
            "&:hover": {
                backgroundColor: props => props.isUserBlocked ? "rgb(220, 30, 41)" : theme.palette.error.light,
            },
        },
    },
}));
