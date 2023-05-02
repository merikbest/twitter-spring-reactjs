import React from "react";
import { Typography } from "@material-ui/core";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import ImageAction from "../ImageAction";
import { ListsIcon } from "../../../../../icons";

describe("ImageAction", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <ImageAction subtitle={"subtitle"} icon={ListsIcon} onClick={jest.fn()} />,
            createMockRootState(LoadingStatus.LOADED));
        expect(wrapper.find(Typography).at(0).text().includes("subtitle")).toBe(true);
    });
});
