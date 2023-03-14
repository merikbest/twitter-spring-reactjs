import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import PollSelect from "../PollSelect";

describe("PollSelect", () => {
    it("should render correctly", () => {
        const mockShowOptions = jest.fn();
        const mockOnChange = jest.fn();
        const wrapper = mountWithStore(
            <PollSelect
                id={"day"}
                title={"Days"}
                value={1}
                onChange={mockOnChange}
                showOptions={mockShowOptions}
                width={140}
                marginRight={0}
            />, createMockRootState(LoadingStatus.SUCCESS));
        wrapper.find("select").simulate("change", { target: { value: 7 } });
        expect(mockOnChange).toHaveBeenCalled();
        expect(mockShowOptions).toHaveBeenCalled();
    });
});
