import { makeStyles } from "@material-ui/core";

export const useAppsAndSessionsStyles = makeStyles((theme) => ({
    listWrapper: {
        "& a": {
            textDecoration: "none"
        },
        "& .MuiListItem-root": {
            padding: "14px 16px",
            "&:hover": {
                cursor: "pointer",
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
    }
}));
