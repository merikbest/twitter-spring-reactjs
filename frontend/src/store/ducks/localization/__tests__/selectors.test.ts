import {
    selectLanguages,
    selectIsLocalizationLoaded,
    selectIsLocalizationLoading,
    selectCountryCodes
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { countryCodes, languages } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("localization selectors:", () => {
    const mockState = createMockRootState();

    describe("selectCountryCodes", () => {
        it("should return CountryCodeResponse array", () => {
            expect(selectCountryCodes({
                ...mockState,
                localization: { ...mockState.localization, countryCodes: countryCodes }
            })).toBe(countryCodes);
        });
    });

    describe("selectLanguages", () => {
        it("should return LanguagesResponse array", () => {
            expect(selectLanguages({
                ...mockState,
                localization: { ...mockState.localization, languages: languages }
            })).toBe(languages);
        });
    });

    describe("selectIsLocalizationLoading", () => {
        it("should return correct result", () => {
            expect(selectIsLocalizationLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsLocalizationLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsLocalizationLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
