import React from "react";
import { Link as MuiLink } from "@material-ui/core";

import DataSharing from "../DataSharing";
import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { DATA_THROUGH_PARTNERSHIPS } from "../../../../../constants/url-constants";

describe("DataSharing", () => {

    it("should render correctly", () => {
        const wrapper = mountWithStore(<DataSharing />, createMockRootState());

        expect(wrapper.text().includes("Allow sharing of additional information with Twitter’s business partners.")).toBe(true);
        expect(wrapper.text().includes("Allow additional information sharing with business partners")).toBe(true);
        expect(wrapper.find(MuiLink).prop("href")).toBe(DATA_THROUGH_PARTNERSHIPS);
    });
});
