import React from "react";
import ReactRouter from "react-router";
import Tab from "@material-ui/core/Tab";
import { createMemoryHistory } from "history";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { TOPICS_FOLLOWED, TOPICS_NOT_INTERESTED, TOPICS_SUGGESTED } from "../../../constants/path-constants";
import Topics from "../Topics";

describe("Topics", () => {

    it("should render Not Interested tab", () => {
        testTab("not_interested", 2, "Not Interested");
    });

    it("should render Suggested tab", () => {
        testTab("suggested", 1, "Suggested");
    });

    it("should render Followed tab", () => {
        testTab("followed", 0, "Followed");
    });

    it("should click Followed tab", () => {
        testClickTab(0, TOPICS_FOLLOWED);
    });

    it("should click Suggested tab", () => {
        testClickTab(1, TOPICS_SUGGESTED);
    });

    it("should click Not Interested tab", () => {
        testClickTab(2, TOPICS_NOT_INTERESTED);
    });

    const testTab = (param: string, tabIndex: number, tabLabel: string): void => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ topics: param });
        const wrapper = mountWithStore(<Topics />, createMockRootState());
        expect(wrapper.find(Tab).at(tabIndex).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(tabIndex).text().includes(tabLabel)).toBe(true);
    };

    const testClickTab = (tabIndex: number, path: string): void => {
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ topics: "" });
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Topics />, createMockRootState(), history);
        wrapper.find(Tab).at(tabIndex).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(path);
    };
});
