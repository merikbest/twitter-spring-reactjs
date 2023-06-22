import { makeStyles } from "@material-ui/core";

export const useTopicsStyles = makeStyles((theme) => ({
    tabs: {
        paddingTop: 53,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "& .MuiTab-root": {
            minWidth: 200,
            fontWeight: 700,
            textTransform: "none"
        },
        "& .MuiTabs-indicator": {
            marginLeft: 65,
            maxWidth: 70,
            height: 4,
            backgroundColor: theme.palette.primary.main
        }
    },
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
