import { makeStyles } from "@material-ui/core";

export const useFollowerGroupStyles = makeStyles((theme) => ({
    followedTextInfoWrapper: {
        marginTop: 12,
        "& .MuiAvatarGroup-root": {
            verticalAlign: "bottom",
            display: "inline-flex",
            "& .MuiAvatar-root": {
                width: "20px !important",
                height: "20px !important",
                border: `1px solid ${theme.palette.background.paper}`
            }
        },
        "& a": {
            textDecoration: "none"
        }
    },
    followedTextInfo: {
        marginLeft: 12,
        "&:hover": {
            cursor: "pointer",
            textDecoration: "underline"
        }
    },
    noFollowedTextInfo: {
        marginTop: 12
    }
}));
