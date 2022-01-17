import {makeStyles, Theme} from "@material-ui/core";

export const useChangeGenderStyles = makeStyles((theme: Theme) => ({
    infoWrapper: {
        padding: "12px 16px",
    },
    genderItemWrapper: {
        padding: "4px 0px",
        "& .MuiButtonBase-root": {
            padding: 4,
            float: "right",
            "& .MuiSvgIcon-root": {
                width: 20,
                height: 20
            },
        },
    },
    textFieldWrapper: {
        paddingTop: "24px",
    },
    buttonWrapper: {
        padding: "12px 16px",
        float: "right",
    },
}));
