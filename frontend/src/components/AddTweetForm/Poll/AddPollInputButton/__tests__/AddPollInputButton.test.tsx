import React from "react";
import { IconButton } from "@material-ui/core";

import AddPollInputButton from "../AddPollInputButton";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ActionIconButton from "../../../../ActionIconButton/ActionIconButton";

describe("AddPollInputButton", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render medium input", () => {
        const mockAddPollInput = jest.fn();
        const wrapper = mountWithStore(<AddPollInputButton pollInputSize={0}
                                                           addPollInput={mockAddPollInput} />, mockStore);
        wrapper.find(ActionIconButton).find(IconButton).simulate("click");
        expect(mockAddPollInput).toHaveBeenCalled();
    });

    it("should render large input", () => {
        mountWithStore(<AddPollInputButton pollInputSize={10} addPollInput={jest.fn()} />, mockStore);
    });
});
