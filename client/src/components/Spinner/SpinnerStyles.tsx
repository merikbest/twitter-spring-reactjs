import {makeStyles, Theme} from "@material-ui/core";

interface SpinnerStylesProps {
    paddingTop?: number;
}

export const useSpinnerStyles = makeStyles<Theme, SpinnerStylesProps>((theme) => ({
    loading: {
        paddingTop: props => (props.paddingTop !== undefined) ? props.paddingTop : 50,
        textAlign: 'center',
    },
}));
