import { SEARCH_TERMS } from "../../constants/common-constants";
import { SearchTermsRequest } from "../../store/ducks/search/contracts/state";

export const addToLocalStorage = (term: "users" | "tags" | "text", item: number | string): void => {
    const localStorageItem = localStorage.getItem(SEARCH_TERMS);

    if (localStorageItem) {
        const searchTerms: SearchTermsRequest = JSON.parse(localStorageItem);

        if (searchTerms[term]) {
            localStorage.setItem(SEARCH_TERMS, JSON.stringify({
                ...searchTerms,
                [term]: [...new Set([...searchTerms[term], item])]
            }));
        } else {
            localStorage.setItem(SEARCH_TERMS, JSON.stringify({ ...searchTerms, [term]: [item] }));
        }
    } else {
        localStorage.setItem(SEARCH_TERMS, JSON.stringify({ [term]: [item] }));
    }
};
