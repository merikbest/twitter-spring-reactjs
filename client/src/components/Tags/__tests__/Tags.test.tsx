import React from "react";
import {Link} from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import Spinner from "../../Spinner/Spinner";
import {mockTags} from "../../../util/mockData/mockData";
import {IconButton} from "@material-ui/core";
import SettingsModal from "../SettingsModal/SettingsModal";
import CloseButton from "../../CloseButton/CloseButton";
import {createMemoryHistory} from "history";
import {HOME_TRENDS} from "../../../util/pathConstants";
import HoverAction from "../../HoverAction/HoverAction";
import TagItem from "../TagItem/TagItem";
import Tags from "../Tags";

describe("Tags", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockState = {...mockRootState, tags: {...mockRootState.tags, items: mockTags}}

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Tags/>, createMockRootState(LoadingStatus.LOADING));
        expect(wrapper.text().includes("Trends for you")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render Tags", () => {
        const wrapper = mountWithStore(<Tags/>, mockState);
        expect(wrapper.find(TagItem).length).toEqual(3);
        expect(wrapper.text().includes("Show more")).toBe(true);
    });

    it("should click open and close SettingsModal", () => {
        const wrapper = mountWithStore(<Tags/>, mockState);
        
        expect(wrapper.find(SettingsModal).prop("visible")).toBe(false);
        
        wrapper.find(IconButton).simulate("click");
        expect(wrapper.find(SettingsModal).prop("visible")).toBe(true);

        wrapper.find(SettingsModal).find(CloseButton).find(IconButton).simulate("click");
        expect(wrapper.find(SettingsModal).prop("visible")).toBe(false);
    });

    it("should click trends link", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Tags/>, mockState, history);
        
        wrapper.find(Link).at(3).simulate("click", {button: 0});

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(HOME_TRENDS);
    });

    it("should hover Settings icon and render Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<Tags/>, mockState);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        
        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("visible")).toBe(true);
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Settings");
        
        wrapper.find(IconButton).simulate("mouseleave");
        expect(wrapper.find(HoverAction).prop("visible")).toBe(false);
    });
});
