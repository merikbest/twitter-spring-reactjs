import {makeStyles, Theme} from "@material-ui/core";

export const useHoverActionStyles = makeStyles<Theme>((theme) => ({
    container: {
        zIndex: 2,
        position: "absolute",
        marginTop: 60,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 2,
        fontSize: 11,
        padding: "2px 4px",
        "& #action-text": {
            lineHeight: "12px",
            color: theme.palette.common.white,
        },
    }
}));
