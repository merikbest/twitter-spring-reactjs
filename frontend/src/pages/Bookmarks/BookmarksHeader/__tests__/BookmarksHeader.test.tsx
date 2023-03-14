import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import Bookmarks from "../../Bookmarks";
import BookmarksHeader from "../BookmarksHeader";

describe("BookmarksHeader", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<BookmarksHeader />, createMockRootState());
        expect(wrapper.text().includes("Bookmarks")).toBe(true);
        expect(wrapper.text().includes("@Cat")).toBe(true);
    });
});
