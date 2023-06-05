import { makeStyles, Theme } from "@material-ui/core";

interface UsePullIconButtonProps {
    disabled?: boolean;
}

export const usePullIconButtonStyles = makeStyles<Theme, UsePullIconButtonProps>((theme) => ({
    quoteImage: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.disabled ? theme.palette.primary.light : theme.palette.primary.main
            }
        }
    }
}));
