import routeData from "react-router";
import axios from "axios";
import {Button} from "@material-ui/core";
import MockAdapter from "axios-mock-adapter";
import {createMemoryHistory} from "history";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import ResetPasswordOption from "../ResetPasswordOption";
import {API_URL} from "../../../../util/url";

describe("ResetPasswordOption", () => {
    const mockStore = createMockRootState();
    const mockUser = mockStore.user.data;
    
    beforeEach(() => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: "/account/forgot/send_password_reset", hash: "", search: "", state: {email: mockUser?.email}
        });
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ResetPasswordOption/>, mockStore);

        expect(wrapper.text().includes("How do you want to reset your password?")).toBe(true);
        expect(wrapper.text().includes("You can use the information associated with your account.")).toBe(true);
        expect(wrapper.text().includes(`Send an email to ${mockUser?.email}`)).toBe(true);
        expect(wrapper.find(Button).at(0).text()).toEqual("Next");
    });

    it("should redirect to CheckEmailCode on submit", (done) => {
        const mock = new MockAdapter(axios);
        mock.onPost(`${API_URL}/auth/forgot`, {email: mockUser?.email}).reply(200);
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<ResetPasswordOption/>, mockStore, history);
        wrapper.find(Button).at(0).simulate("submit");
        
        setImmediate(() => {
            wrapper.update();
            done();
            expect(pushSpy).toHaveBeenCalled();
            expect(pushSpy).toHaveBeenCalledWith("/account/forgot/confirm_pin_reset");
        });
    });
});
