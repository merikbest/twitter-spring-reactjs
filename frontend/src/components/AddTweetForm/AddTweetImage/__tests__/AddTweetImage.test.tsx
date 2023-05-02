import React from "react";
import routeData from "react-router";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import AddTweetImage from "../AddTweetImage";
import { ImageObj } from "../../AddTweetForm";
import { MODAL } from "../../../../constants/path-constants";

describe("AddTweetImage", () => {
    const mockImages = [{ src: "test", file: new File([""], "filename", { type: "text/html" }) }] as ImageObj[];

    it("should render default image", () => {
        testMountAddTweetImage(mockImages);
    });

    it("should render small image", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        testMountAddTweetImage(mockImages);
    });

    it("should render empty component", () => {
        testMountAddTweetImage([]);
    });

    const testMountAddTweetImage = (mockImages: ImageObj[]): void => {
        mountWithStore(
            <AddTweetImage
                images={mockImages}
                removeImage={jest.fn()}
                imageDescription={""}
                handleChangeDescription={jest.fn()}
                selectedUsers={[]}
                handleDelete={jest.fn()}
                handleListItemClick={jest.fn()}
            />, createMockRootState(LoadingStatus.SUCCESS));
    };
});
