import { makeStyles, Theme } from "@material-ui/core";
import { LocationState } from "./Settings";

interface SettingsStylesProps {
    location: LocationState,
}

export const useSettingsStyles = makeStyles<Theme, SettingsStylesProps>((theme) => ({
    grid: {
        padding: "12px 0px 0px 0px !important"
    },
    container: {
        padding: 0,
        borderRadius: 0,
        minHeight: props => props.location.pathname.includes("privacy_and_safety") ? 1300 : "100vh",
        borderTop: 0,
        borderBottom: 0
    },
    leftSideHeader: {
        width: 416
    },
    rightSideHeader: {
        width: 599,
        "& .MuiTypography-h5": {
            marginLeft: 15
        }
    },
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiList-root": {
            padding: 0
        },
        "& .MuiListItem-root": {
            padding: "14px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: theme.palette.secondary.main
            },
            "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.main
            }
        },
        "& .Mui-selected": {
            borderRight: `2px solid ${theme.palette.primary.main}`,
            "& svg": {
                marginRight: "-2px"
            }
        },
        "& svg": {
            marginLeft: "auto"
        }
    },
    pageContainer: {
        minWidth: 600,
        padding: 0,
        borderLeft: 0
    }
}));
