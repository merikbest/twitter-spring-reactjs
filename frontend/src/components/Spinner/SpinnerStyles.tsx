import { makeStyles, Theme } from "@material-ui/core";

interface SpinnerStylesProps {
    paddingTop?: number;
}

export const useSpinnerStyles = makeStyles<Theme, SpinnerStylesProps>((theme) => ({
    loading: {
        width: 30,
        margin: "0px auto",
        paddingTop: props => (props.paddingTop !== undefined) ? props.paddingTop : 50,
        paddingBottom: 50
    },
    spinner: {
        height: 26,
        width: 26,
        animation: `$spinner 0.75s linear 0s infinite`,
        "& svg": {
            height: "100%",
            width: "100%"
        }
    },
    "@keyframes spinner": {
        "0%": {
            transform: "rotate(0deg)"
        },
        "100%": {
            transform: "rotate(360deg)"
        }
    },
    backCircle: {
        stroke: theme.palette.primary.main,
        strokeWidth: 4,
        opacity: 0.2
    },
    frontCircle: {
        stroke: theme.palette.primary.main,
        strokeWidth: 4,
        strokeDasharray: 80,
        strokeDashoffset: 60
    }
}));
