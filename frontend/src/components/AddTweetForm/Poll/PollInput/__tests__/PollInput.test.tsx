import React from "react";
import { InputLabel } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { PollInputField } from "../PollInputStyles";
import { LoadingStatus } from "../../../../../types/common";
import PollInput from "../PollInput";

describe("PollInput", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should change input field", () => {
        const mockOnChange = jest.fn();
        const wrapper = mountWithStore(
            <PollInput
                id={"choice1"}
                onChange={mockOnChange}
                value={"25"}
                label={"Choice 1"}
            />, mockRootState);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("change", { target: { value: "test poll 1" } });
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockOnChange).toHaveBeenCalledWith({ choice1: "test poll 1" });
    });

    it("should focus and blur input field", () => {
        const wrapper = mountWithStore(
            <PollInput
                id={"choice1"}
                onChange={jest.fn()}
                value={"1111111111111111111111111"}
                label={"Choice 1"}
            />, mockRootState);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("focus");
        expect(wrapper.find(InputLabel).at(0).text().includes("25 / 25")).toBe(true);
        wrapper.find(PollInputField).at(0).find("input").at(0).simulate("blur");
        expect(wrapper.find(InputLabel).at(0).text().includes("25 / 25")).toBe(false);
    });
});
