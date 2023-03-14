import React from "react";
import { createMemoryHistory } from "history";

import { createMockRootState, mountWithStore } from "../../../util/test-utils/test-helper";
import { SideSearchTextField } from "../../SearchTextField/SideSearchTextField";
import SideSearch from "../SideSearch";
import { LoadingStatus } from "../../../types/common";

describe("SideSearch", () => {
    it("should change input and submit", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<SideSearch />, createMockRootState(LoadingStatus.SUCCESS), history);

        expect(wrapper.find(SideSearchTextField).prop("placeholder")).toBe("Search Twitter");
        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("");

        wrapper.find(SideSearchTextField).find("input").at(0).simulate("change", { target: { value: "test_value" } });

        expect(wrapper.find(SideSearchTextField).prop("value")).toBe("test_value");

        wrapper.find(SideSearchTextField).at(0).simulate("submit");

        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: "/search", state: { text: "test_value" } });
    });
});
