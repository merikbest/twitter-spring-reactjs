import React from "react";
import Tab from "@material-ui/core/Tab";

import Notifications from "../Notifications";
import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import Spinner from "../../../components/Spinner/Spinner";
import {NotificationsActionsType} from "../../../store/ducks/notifications/contracts/actionTypes";
import {UserActionsType} from "../../../store/ducks/user/contracts/actionTypes";

window.scrollTo = jest.fn();

describe("Notifications", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<Notifications/>, createMockRootState());
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");
        
        expect(wrapper.text().includes("Notifications")).toBe(true);
        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(wrapper.find(Tab).at(0).text().includes("All")).toBe(true);
        expect(wrapper.find(Tab).at(1).text().includes("Mentions")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {type: NotificationsActionsType.FETCH_NOTIFICATIONS});
        expect(mockDispatchFn).nthCalledWith(2, {type: UserActionsType.FETCH_USER_DATA});
    });

    it("should render empty All Notifications", () => {
        const wrapper = mountWithStore(<Notifications/>, mockStore);
        const tab = wrapper.find(Tab).at(0);
        tab.simulate("click");
        
        expect(wrapper.find(Tab).at(0).text().includes("All")).toBe(true);
        expect(wrapper.find(Tab).at(0).prop("selected")).toBe(true);
        expect(wrapper.text().includes("Nothing to see here — yet")).toBe(true);
        expect(wrapper.text().includes("From like to Retweets and whole lot more, this is where all the actions happens.")).toBe(true);
    });

    it("should render empty Mentions Notifications", () => {
        const wrapper = mountWithStore(<Notifications/>, mockStore);
        const tab = wrapper.find(Tab).at(1);
        tab.simulate("click");

        expect(wrapper.find(Tab).at(1).text().includes("Mentions")).toBe(true);
        expect(wrapper.find(Tab).at(1).prop("selected")).toBe(true);
        expect(wrapper.text().includes("Nothing to see here — yet")).toBe(true);
        expect(wrapper.text().includes("When someone mentions you, you’ll find it here.")).toBe(true);
    });
});
