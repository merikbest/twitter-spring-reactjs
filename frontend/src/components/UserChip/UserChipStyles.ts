import { makeStyles } from "@material-ui/core";

export const useUserChipStyles = makeStyles((theme) => ({
    chip: {
        marginLeft: 8,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        "& .MuiChip-label": {
            fontSize: 15,
            fontWeight: 700
        },
        "& .MuiChip-deleteIcon": {
            color: theme.palette.primary.main
        },
        "&.MuiChip-deletable": {
            "&:focus": {
                backgroundColor: "rgb(29, 155, 240, 0.1)"
            }
        },
    }
}));
