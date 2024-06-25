import { countryCodesReducer, initialCountryCodesState } from "../reducer";
import { CountryCodesActions, CountryCodesActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { CountryCodeResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("countryCodesReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(countryCodesReducer(undefined, {} as CountryCodesActions)).toEqual(initialCountryCodesState);
        });
    });

    describe("chats handlers:", () => {
        testActionDispatch(
            CountryCodesActionsType.SET_COUNTRY_CODES,
            countryCodesReducer(initialCountryCodesState, {
                type: CountryCodesActionsType.SET_COUNTRY_CODES,
                payload: [{ id: 1 }] as CountryCodeResponse[]
            }),
            {
                ...initialCountryCodesState,
                items: [{ id: 1 }] as CountryCodeResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            CountryCodesActionsType.SET_LOADING_STATE,
            countryCodesReducer(initialCountryCodesState, {
                type: CountryCodesActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialCountryCodesState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
