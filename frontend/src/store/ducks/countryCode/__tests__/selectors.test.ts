import { selectCountryCodeItems, selectIsCountryCodesLoaded, selectIsCountryCodesLoading } from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { countryCodes } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("countryCodes selectors:", () => {
    const mockState = createMockRootState();

    describe("selectCountryCodeItems", () => {
        it("should return CountryCodeResponse array", () => {
            expect(selectCountryCodeItems({
                ...mockState,
                countryCodes: { ...mockState.countryCodes, items: countryCodes }
            })).toBe(countryCodes);
        });
    });

    describe("selectIsCountryCodesLoading", () => {
        it("should return correct result", () => {
            expect(selectIsCountryCodesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsCountryCodesLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsCountryCodesLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
