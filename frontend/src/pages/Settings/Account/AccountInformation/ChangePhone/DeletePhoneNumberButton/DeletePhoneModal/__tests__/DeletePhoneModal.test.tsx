import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../../types/common";
import DeletePhoneModal from "../DeletePhoneModal";
import { UserActionsType } from "../../../../../../../../store/ducks/user/contracts/actionTypes";

describe("DeletePhoneModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<DeletePhoneModal visible={true} onClose={jest.fn()} />, mockStore);
        expect(wrapper.text().includes("Delete phone number?")).toBe(true);
        expect(wrapper.text().includes("Delete")).toBe(true);
        expect(wrapper.text().includes("Cancel")).toBe(true);
    });

    it("should render empty DeletePhoneModal window correctly", () => {
        const wrapper = mountWithStore(<DeletePhoneModal visible={false} onClose={jest.fn()} />, mockStore);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should click deletePhoneNumber DeletePhoneModal window", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<DeletePhoneModal visible={true} onClose={mockOnClose} />, mockStore);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: UserActionsType.DELETE_PHONE_NUMBER });
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should click close DeletePhoneModal window", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<DeletePhoneModal visible={true} onClose={mockOnClose} />, mockStore);
        wrapper.find(Button).at(1).simulate("click");
        expect(mockOnClose).toHaveBeenCalled();
    });
});
