import {makeStyles, Theme} from "@material-ui/core";

export const useLayoutStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        height: '100vh',
    },
    rightSide: {
        paddingTop: 4,
        position: 'sticky',
        top: 0,
    },
}));
