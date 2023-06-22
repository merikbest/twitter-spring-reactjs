import { makeStyles } from "@material-ui/core";

export const useListsModalStyles = makeStyles((theme) => ({
    createList: {
        width: "100%",
        padding: "12px 16px",
        color: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": {
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main
        }
    },
    listAvatar: {
        width: "48px !important",
        height: "48px !important",
        borderRadius: "12px !important",
        marginRight: 15
    },
    list: {
        "& .MuiListItem-root": {
            "& .MuiTypography-body1": {
                fontWeight: 700,
                fontSize: 15
            },
            padding: "12px 16px",
            "&:hover": {
                cursor: "pointer",
                backgroundColor: "rgba(0, 0, 0, 0.03)"
            },
            "& #check": {
                position: "absolute",
                right: 0,
                marginRight: 16,
                "& svg": {
                    color: theme.palette.primary.main,
                    height: "1.30em"
                }
            }
        },
        "& .Mui-selected": {
            backgroundColor: theme.palette.action.hover
        }
    }
}));
