import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import CustomizeModal from "../CustomizeModal";
import {LoadingStatus} from "../../../../store/types/common";

describe("CustomizeModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly CustomizeModal", () => {
        const mockOnOpenCreateAccount = jest.fn();
        const wrapper = mountWithStore(
            <CustomizeModal
                open={true}
                onClose={jest.fn()}
                onOpenCreateAccount={mockOnOpenCreateAccount}
            />, mockStore);
        
        wrapper.find(Button).at(0).simulate("click");
        
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Customize your experience")).toBe(true);
        expect(wrapper.text().includes("Track where you see Twitter content across the web")).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        expect(mockOnOpenCreateAccount).toHaveBeenCalled();
        expect(mockOnOpenCreateAccount).toHaveBeenCalledWith(true);
    });
});
