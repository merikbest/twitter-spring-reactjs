import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types";
import CreateListsModal from "../CreateListsModal";

describe("CreateListsModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });
    
    it("should render empty Create List Modal window correctly", () => {
        const wrapper = mountWithStore(<CreateListsModal visible={false} onClose={jest.fn()}/>, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render Create List Modal window correctly", () => {
        const wrapper = mountWithStore(<CreateListsModal visible={false} onClose={jest.fn()}/>, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Create a new List")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Next")).toBe(true);
        expect(wrapper.text().includes("Make private")).toBe(true);
        expect(wrapper.text().includes("When you make a List private, only you can see it.")).toBe(true);
    });
    
    
});
