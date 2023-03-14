import { makeStyles, Theme } from "@material-ui/core";

interface HoverActionStylesProps {
    positionTop?: boolean;
}

export const useHoverActionStyles = makeStyles<Theme, HoverActionStylesProps>((theme) => ({
    container: {
        zIndex: 2,
        position: "absolute",
        marginTop: props => props.positionTop ? -50 : 60,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderRadius: 2,
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 4px",
        "& #action-text": {
            lineHeight: "12px",
            color: theme.palette.common.white
        }
    }
}));
