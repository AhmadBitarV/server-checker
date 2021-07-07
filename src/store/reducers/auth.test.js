import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("Should return initialState in case no proper case was handled", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      error: null,
      loading: false,
    });
  });
});
