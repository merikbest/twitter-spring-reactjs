import {makeStyles, Theme} from "@material-ui/core";

export const useFollowerGroupStyles = makeStyles((theme: Theme) => ({
    followedTextInfoWrapper: {
        marginTop: 12,
        "& .MuiAvatarGroup-root": {
            verticalAlign: "middle",
            display: "inline-flex",
            "& .MuiAvatar-root": {
                width: "20px !important",
                height: "20px !important",
                border: `1px solid ${theme.palette.background.paper}`,
            },
        },
    },
    followedTextInfo: {
        marginLeft: 12,
        color: theme.palette.text.secondary,
        lineHeight: "16px",
        fontSize: 13,
        fontWeight: 400,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
}));
