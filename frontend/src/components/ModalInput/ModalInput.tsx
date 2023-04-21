import React, { FC, ReactElement } from "react";
import { InputAdornment } from "@material-ui/core";

import { ModalInputWrapper } from "./ModalInputWrapper";
import { SearchIcon } from "../../icons";

interface ModalInputProps {
    placeholder: string;
    searchText: string;
    onSearch: (text: string) => void;
}

const ModalInput: FC<ModalInputProps> = ({ placeholder, searchText, onSearch }): ReactElement => {

    return (
        <ModalInputWrapper
            fullWidth
            placeholder={placeholder}
            variant="outlined"
            onChange={(event) => onSearch(event.target.value)}
            value={searchText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {SearchIcon}
                    </InputAdornment>
                )
            }}
        />
    );
};

export default ModalInput;
