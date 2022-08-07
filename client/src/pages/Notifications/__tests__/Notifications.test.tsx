import React from "react";
import {createMemoryHistory} from "history";
import Tab from "@material-ui/core/Tab";
import routeData from "react-router";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {NOTIFICATIONS, NOTIFICATIONS_MENTIONS} from "../../../util/pathConstants";
import Notifications from "../Notifications";

window.scrollTo = jest.fn();

describe("Notifications", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: NOTIFICATIONS,
            hash: "",
            search: "",
            state: undefined
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<Notifications/>, mockStore);
        expect(wrapper.text().includes("Notifications")).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("All")).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Mentions")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(false);
    });

    it("should click Notifications tab", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Notifications/>, mockStore, history);
        wrapper.find(Tab).at(0).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(NOTIFICATIONS);
        expect(wrapper.find(Tab).at(0).text().includes("All")).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
    });

    it("should click Mentions tab", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<Notifications/>, mockStore, history);
        wrapper.find(Tab).at(1).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(NOTIFICATIONS_MENTIONS);
        expect(wrapper.find(Tab).at(1).text().includes("Mentions")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
    });
});
