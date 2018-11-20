import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_DATA = 'ADD_DATA'
const GET_DATA = 'GET_DATA'

/**
 * INITIAL STATE
 */
const initialState = {
  user: {},
  data: []
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
export const addData = data => ({
  type: ADD_DATA,
  data
})
export const getData = data => ({
  type: GET_DATA,
  data
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchData = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/users/${userId}`)
      const data = response.data
      const action = getData(data)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, user: action.user}
    case REMOVE_USER:
      return {...state, user: initialState.user}
    case ADD_DATA:
      return {...state, data: action.data}
    case GET_DATA:
      return {...state, data: action.data}
    default:
      return state
  }
}
