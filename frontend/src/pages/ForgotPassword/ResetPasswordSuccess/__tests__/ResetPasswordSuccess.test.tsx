import React from "react";
import { createMemoryHistory } from "history";
import { Link as MuiLink } from "@material-ui/core";
import { setImmediate } from "timers";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import ResetPasswordSuccess from "../ResetPasswordSuccess";
import { ACCOUNT_LOGIN } from "../../../../constants/path-constants";

describe("ResetPasswordSuccess", () => {
    const mockStore = createMockRootState();

    it("should render correctly", (done) => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ResetPasswordSuccess />, mockStore, history);
        wrapper.find(MuiLink).at(2).simulate("click", { button: 0 });

        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_LOGIN);
            expect(wrapper.text().includes("You’re all set. You've successfully changed your password.")).toBe(true);
            expect(wrapper.text().includes("Take a moment to review the applications that have access to your account. Revoke those you don't recognize or no longer use.")).toBe(true);
            expect(wrapper.text().includes("This makes it easy to get back into your account if you're ever locked out.")).toBe(true);
            expect(wrapper.text().includes("Continue to Twitter")).toBe(true);
        });
    });
});
