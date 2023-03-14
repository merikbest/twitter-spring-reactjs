import React from "react";
import routeData from "react-router";
import { createMemoryHistory } from "history";
import { IconButton } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import UserImageModal from "../UserImageModal";
import { PROFILE_PHOTO } from "../../../../constants/path-constants";
import { mockUser } from "../../../../util/test-utils/mock-test-data";

describe("UserImageModal", () => {

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: `${PROFILE_PHOTO}/2`, hash: "", search: "", state: { imageSrc: mockUser.avatar }
        });
    });

    it("should render image", () => {
        const wrapper = mountWithStore(<UserImageModal />, createMockRootState());
        expect(wrapper.find("img").prop("src")).toBe(mockUser.avatar);
    });

    it("should click Close User Avatar Modal Window", () => {
        testCloseModal("div");
    });

    it("should click on Close Modal Window", () => {
        testCloseModal(IconButton);
    });

    const testCloseModal = (component: any): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "goBack");
        const wrapper = mountWithStore(<UserImageModal />, createMockRootState(), history);
        expect(wrapper.find("img").exists()).toBeTruthy();
        wrapper.find(component).at(0).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(wrapper.find("img").exists()).toBeFalsy();
    };
});
