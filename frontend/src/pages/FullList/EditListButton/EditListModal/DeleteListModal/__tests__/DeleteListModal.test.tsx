import React from "react";
import ReactRouter from "react-router";
import { Button, Dialog } from "@material-ui/core";

import { mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ListActionType } from "../../../../../../store/ducks/list/contracts/actionTypes";
import DeleteListModal from "../DeleteListModal";

describe("DeleteListModal", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ listId: "3" });
    });

    it("should render empty Delete List Modal window correctly", () => {
        const wrapper = mountWithStore(<DeleteListModal />);
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(false);
    });

    it("should render Delete List Modal window correctly", () => {
        const wrapper = mountWithStore(<DeleteListModal />);
        wrapper.find("#onOpenDeleteListModal").at(0).simulate("click");
        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Delete List?")).toBe(true);
        expect(wrapper.text().includes("This can’t be undone and you’ll lose your List.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Delete")).toBe(true);
    });

    it("should click close Delete List Modal window", () => {
        const wrapper = mountWithStore(<DeleteListModal />);
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(false);
        wrapper.find("#onOpenDeleteListModal").at(0).simulate("click");
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(Dialog).at(0).prop("open")).toBe(false);
    });

    it("should click delete Delete List Modal window", () => {
        const wrapper = mountWithStore(<DeleteListModal />);
        wrapper.find("#onOpenDeleteListModal").at(0).simulate("click");
        wrapper.find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 3, type: ListActionType.DELETE_LIST });
    });
});
