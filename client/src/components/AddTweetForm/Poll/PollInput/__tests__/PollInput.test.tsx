import React from "react";
import {InputLabel} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {PollInputField} from "../PollInputStyles";
import PollInput from "../PollInput";
import {LoadingStatus} from "../../../../../store/types/common";

describe("PollInput", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should change input field", () => {
        const mockOnChange = jest.fn()

        const wrapper = mountWithStore(<PollInput onChange={mockOnChange} value={"25"} label={"Choice 1"}/>, mockRootState);

        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("change", {target: {value: "test poll 1"}});
        
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith("test poll 1");
    });

    it("should focus and blur input field", () => {
        const wrapper = mountWithStore(<PollInput onChange={jest.fn()} value={""} label={"Choice 1"}/>, mockRootState);

        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("focus");
        expect(wrapper.find(InputLabel).at(0).text().includes("0 / 25")).toBe(true);

        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("blur");
        expect(wrapper.find(InputLabel).at(0).text().includes("0 / 25")).toBe(false);
    });
});
