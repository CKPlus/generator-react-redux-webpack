import * as types from '../constants/actionTypes';
import { CALL_API, Schemas } from '../middleware/api'


// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchTopalbums(login) {
  let { ALBUMS_REQUEST, ALBUMS_SUCCESS, ALBUMS_FAILURE } = types
  return {
    [CALL_API]: {
      types: [ ALBUMS_REQUEST, ALBUMS_SUCCESS, ALBUMS_FAILURE ],
      type: ALBUMS_REQUEST,
      endpoint: `/us/rss/topalbums/limit=10/json`,
    }
  }
}

export function load(login, requiredFields = []) {
  return (dispatch, getState) => {
    return dispatch(fetchTopalbums())
  }
}