import { makeStyles, Theme } from "@material-ui/core";

interface UsePollIconButtonProps {
    disabled?: boolean;
}

export const usePollIconButtonStyles = makeStyles<Theme, UsePollIconButtonProps>((theme) => ({
    quoteImage: {
        "& .MuiIconButton-root": {
            "& svg": {
                color: props => props.disabled ? theme.palette.primary.light : theme.palette.primary.main
            }
        }
    }
}));
