import React from "react";
import { Button, Checkbox, Dialog } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import CreateListsModal from "../CreateListsModal";
import CreateListsModalInput from "../CreateListsModalInput/CreateListsModalInput";
import { ListsActionType } from "../../../../../store/ducks/lists/contracts/actionTypes";
import { wallpapers } from "../../../../../util/wallpapers";
import { LoadingStatus } from "../../../../../types/common";

describe("CreateListsModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Create List Modal window correctly", () => {
        const wrapper = mountWithStore(<CreateListsModal visible={false} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render Create List Modal window correctly", () => {
        const wrapper = mountWithStore(<CreateListsModal visible={true} onClose={jest.fn()} />, mockStore);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Create a new List")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Next")).toBe(true);
        expect(wrapper.text().includes("Make private")).toBe(true);
        expect(wrapper.text().includes("When you make a List private, only you can see it.")).toBe(true);
    });

    it("should submit create list form", (done) => {
        jest.spyOn(global.Math, "random").mockReturnValue(1);
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<CreateListsModal visible={true} onClose={mockOnClose} />, mockStore);
        const nameInput = wrapper.find(CreateListsModalInput).at(0).find("input").at(0);
        const descriptionInput = wrapper.find(CreateListsModalInput).at(1).find("textarea").at(0);
        const mockCheckbox = wrapper.find(Checkbox).at(0);
        nameInput.simulate("change", { target: { value: "Test name" } });
        descriptionInput.simulate("change", { target: { value: "Test description" } });
        mockCheckbox.simulate("change", { target: { checked: true } });
        wrapper.find(Button).at(0).simulate("submit");

        setImmediate(() => {
            wrapper.update();
            done();
            expect(mockDispatchFn).nthCalledWith(1, {
                payload: {
                    altWallpaper: wallpapers[wallpapers.length],
                    description: "Test description",
                    isPrivate: false,
                    name: "Test name",
                    wallpaper: undefined
                },
                type: ListsActionType.CREATE_LIST
            });
            expect(mockOnClose).toHaveBeenCalled();
        });
    });
});
