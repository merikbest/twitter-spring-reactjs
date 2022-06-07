import React from "react";
import routeData from "react-router";
import {createMemoryHistory} from "history";
import {IconButton} from "@material-ui/core";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import UserImageModal from "../UserImageModal";
import {PROFILE_PHOTO} from "../../../../util/pathConstants";
import {mockUser} from "../../../../util/mockData/mockData";

describe("UserImageModal", () => {

    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: `${PROFILE_PHOTO}/2`, hash: "", search: "", state: {imageSrc: mockUser.avatar.src}
        });
    });

    it("should render image", () => {
        const wrapper = mountWithStore(<UserImageModal/>, createMockRootState());

        expect(wrapper.find("img").prop("src")).toBe(mockUser.avatar.src);
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
        const wrapper = mountWithStore(<UserImageModal/>, createMockRootState(), history);

        expect(wrapper.find("img").exists()).toBeTruthy();

        wrapper.find(component).at(0).simulate("click");

        expect(pushSpy).toHaveBeenCalled();
        expect(wrapper.find("img").exists()).toBeFalsy();
    };
});
