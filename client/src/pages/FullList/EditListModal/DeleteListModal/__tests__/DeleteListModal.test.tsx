import React from "react";
import {Button, Dialog} from "@material-ui/core";

import {mountWithStore} from "../../../../../util/testHelper";
import DeleteListModal from "../DeleteListModal";

describe("DeleteListModal", () => {
    it("should render empty Delete List Modal window correctly", () => {
        const wrapper = mountWithStore(<DeleteListModal visible={false} onClose={jest.fn()} onDeleteList={jest.fn()}/>);

        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    it("should render Delete List Modal window correctly", () => {
        const wrapper = mountWithStore(<DeleteListModal visible={true} onClose={jest.fn()} onDeleteList={jest.fn()}/>);

        expect(wrapper.find(Dialog).exists()).toBeTruthy();
        expect(wrapper.text().includes("Delete List?")).toBe(true);
        expect(wrapper.text().includes("This can’t be undone and you’ll lose your List.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Delete")).toBe(true);
    });

    it("should click close Delete List Modal window", () => {
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(<DeleteListModal visible={true} onClose={mockOnClose} onDeleteList={jest.fn()}/>);
        const closeButton = wrapper.find(Button).at(0);
        closeButton.simulate("click");
        
        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should click delete Delete List Modal window", () => {
        const mockOnDeleteList = jest.fn();
        const wrapper = mountWithStore(<DeleteListModal visible={true} onClose={jest.fn()} onDeleteList={mockOnDeleteList}/>);
        const deleteListButton = wrapper.find(Button).at(1);
        deleteListButton.simulate("click");

        expect(mockOnDeleteList).toHaveBeenCalled();
    });
});
