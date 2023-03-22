import React from "react";
import { ClickAwayListener } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { SideSearchTextField } from "../../SearchTextField/SideSearchTextField";
import SideSearch from "../SideSearch";
import RecentSearchResults from "../RecentSearchResults/RecentSearchResults";
import SearchResults from "../SearchResults/SearchResults";
import { SearchActionsType } from "../../../store/ducks/search/contracts/actionTypes";

describe("SideSearch", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click open popup", () => {
        const wrapper = mountWithStore(<SideSearch />, createMockRootState());
        expect(wrapper.find(RecentSearchResults).exists()).toBeFalsy();
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("click");
        expect(wrapper.find(RecentSearchResults).exists()).toBeTruthy();
    });

    it("should click close popup", () => {
        const wrapper = mountWithStore(<SideSearch />, createMockRootState());
        // @ts-ignore
        wrapper.find(ClickAwayListener).prop("onClickAway")(jest.fn());
        expect(wrapper.find(RecentSearchResults).exists()).toBeFalsy();
    });

    it("should click open popup and change input field", () => {
        const wrapper = mountWithStore(<SideSearch />, createMockRootState());
        expect(wrapper.find(SideSearchTextField).prop("placeholder")).toBe("Search Twitter");
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("");
        expect(wrapper.find("#closeIcon").exists()).toBeFalsy();
        expect(wrapper.find(SearchResults).exists()).toBeFalsy();
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("click");
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("test_value");
        expect(wrapper.find("#closeIcon").exists()).toBeTruthy();
        expect(wrapper.find(SearchResults).exists()).toBeTruthy();
    });

    it("should click clear input field", () => {
        const wrapper = mountWithStore(<SideSearch />, createMockRootState());
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("");
        expect(wrapper.find("#closeIcon").exists()).toBeFalsy();
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("click");
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("test_value");
        expect(wrapper.find("#closeIcon").exists()).toBeTruthy();
        wrapper.find("#clearText").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: SearchActionsType.RESET_SEARCH_RESULT });
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("");
        expect(wrapper.find("#closeIcon").exists()).toBeFalsy();
    });

    it("should click open popup and dispatch search by text", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<SideSearch />, createMockRootState());
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("click");
        jest.runAllTimers();
        wrapper.update();
        wrapper.find(SideSearchTextField).find("input").at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: "test_value", type: SearchActionsType.FETCH_SEARCH_BY_TEXT });
    });
});
