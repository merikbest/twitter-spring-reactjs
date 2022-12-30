import React from "react";
import {Paper} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types/common";
import PollFooter from "../PollFooter";

describe("PollFooter", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const mockOnClosePoll = jest.fn();
        const wrapper = mountWithStore(<PollFooter onClosePoll={mockOnClosePoll}/>, mockStore);
        wrapper.find(Paper).simulate("click");
        expect(mockOnClosePoll).toHaveBeenCalled();
        expect(wrapper.text().includes("Remove poll")).toBe(true);
    });
});
