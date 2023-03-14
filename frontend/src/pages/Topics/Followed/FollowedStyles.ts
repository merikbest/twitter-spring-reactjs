import { makeStyles, Theme } from "@material-ui/core";

export const useFollowedStyles = makeStyles((theme: Theme) => ({
    topicsBlock: {
        marginRight: 4,
        display: "inline-flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    topicsContainer: {
        display: "flex",
        flexDirection: "column"
    },
    topicsInfo: {
        width: 1000
    },
    topicsItems: {
        "& .MuiIconButton-root": {
            "&:hover": {
                backgroundColor: "black !important",
                "& svg": {
                    color: "white !important"
                }
            }
        }
    },
    moreTopics: {
        padding: 16,
        color: theme.palette.primary.main,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    }
}));
