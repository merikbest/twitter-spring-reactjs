import React from "react";
import {InputAdornment, Select, SelectProps, styled} from "@material-ui/core";

import {ArrowBottomIcon} from "../../icons";

export const FilledSelect = styled((props: SelectProps) => (
    <Select
        {...props}
        endAdornment={
            <InputAdornment position="end">
                {ArrowBottomIcon}
            </InputAdornment>
        }
    />
))(({theme}) => ({
    '& .MuiSelect-filled': {
        border: `1px solid ${theme.palette.grey[100]}`,
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "transparent",
        zIndex: 2,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        "&:focused" : {
            border: 0,
        },
    },
    "&.MuiInputBase-root": {
        "& .MuiInputAdornment-root": {
            marginLeft: "-32px",
            zIndex: 1,
            "& svg" : {
                color: theme.palette.text.secondary,
                height: "1.25em"
            }
        },
    },
    "& .MuiSelect-root": {
        "&:focused" : {
            border: 0,
        },
    },
    '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        "& .MuiSelect-root": {
            borderColor: "transparent",
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        },
        "& .MuiInputAdornment-root": {
            "& svg" : {
                color: `${theme.palette.primary.main} !important`,
            }
        },
    },
    "&.MuiFilledInput-underline": {
        backgroundColor: theme.palette.background.paper,
        '&:before': {
            border: 0,
        },
        '&:after': {
            border: 0,
        },
        "& svg": {
            "&.MuiSelect-icon": {
                fill: "transparent"
            },
        },
    },
    "&.Mui-error": {
        backgroundColor: "transparent",
        '& .MuiSelect-filled': {
            border: 0,
        },
        border: '1px solid rgb(224, 36, 94)',
        '&.Mui-focused': {
            backgroundColor: "transparent",
            "& .MuiSelect-root": {
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgb(224, 36, 94)",
            },
        },
    },
}));
