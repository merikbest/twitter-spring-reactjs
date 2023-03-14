import React from "react";
import { Button, Checkbox, Dialog } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import UnsentTweetsModal from "../UnsentTweetsModal";
import Spinner from "../../../Spinner/Spinner";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import UnsentTweetItem from "../UnsentTweetItem/UnsentTweetItem";
import AddTweetForm from "../../AddTweetForm";
import { UnsentTweetActionType } from "../../../../store/ducks/unsentTweets/contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("UnsentTweetsModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockState = { ...mockRootState, unsentTweets: { ...mockRootState.unsentTweets, items: mockTweets } };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render empty Scheduled tweets", () => {
        testTabClick(0, "Scheduled", "You don’t have any scheduled Tweets");
    });

    it("should render empty Unsent tweets", () => {
        testTabClick(1, "Drafts", "You don’t have any unsent Tweets");
    });

    it("should render Scheduled tweets and open edit tweet modal", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()} />, mockState);

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(wrapper.find(UnsentTweetItem).length).toEqual(2);

        wrapper.find(UnsentTweetItem).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Unsent Tweets")).toBe(true);
        expect(wrapper.text().includes("Unsent Tweets")).toBe(true);
        expect(wrapper.find(AddTweetForm).exists()).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(AddTweetForm).exists()).toBe(false);
    });

    it("should select Scheduled tweets", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()} />, mockState);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
        expect(wrapper.find(Button).at(2).text().includes("Delete")).toBe(true);
        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);

        wrapper.find(Button).at(1).simulate("click");

        expect(wrapper.find(Button).at(1).text().includes("Deselect All")).toBe(true);
        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);
        expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);

        wrapper.find(Button).at(1).simulate("click");

        expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(false);

        wrapper.find(Button).at(1).simulate("click");
        wrapper.find(Checkbox).at(0).simulate("click");

        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(false);
        expect(wrapper.find(Checkbox).at(1).prop("value")).toBe(15);
        expect(wrapper.find(Checkbox).at(1).prop("checked")).toBe(true);

        wrapper.find(Checkbox).at(0).simulate("click");

        expect(wrapper.find(Checkbox).at(0).prop("value")).toBe(1);
        expect(wrapper.find(Checkbox).at(0).prop("checked")).toBe(true);

        wrapper.find(Button).at(2).simulate("click");
    });

    it("should click Edit Tweets", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()} />, mockRootState);

        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(false);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Done")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Select All")).toBe(true);
        expect(wrapper.find(Button).at(2).text().includes("Delete")).toBe(true);

        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find("#editListFooter").exists()).toBe(false);
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()} />, createMockRootState());

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Edit")).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("Scheduled")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(false);
        expect(wrapper.find(Tab).at(1).text().includes("Drafts")).toBe(true);
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={false} onClose={jest.fn()} />, mockRootState);

        expect(wrapper.find(UnsentTweetsModal).prop("visible")).toBe(false);
        expect(wrapper.find(Dialog).exists()).toBeFalsy();
    });

    const testTabClick = (tabIndex: number, tabText: string, emptyText: string): void => {
        const wrapper = mountWithStore(<UnsentTweetsModal visible={true} onClose={jest.fn()} />, mockRootState);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).text().includes(tabText)).toBe(true);
        expect(wrapper.text().includes(emptyText)).toBe(true);
        expect(wrapper.text().includes("When you do, you’ll find them here.")).toBe(true);
        expect(mockDispatchFn).toHaveBeenCalledWith({ payload: 0, type: UnsentTweetActionType.FETCH_UNSENT_TWEETS });
    };
});
