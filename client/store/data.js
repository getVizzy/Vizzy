const axios = require('axios')

const initialState = []
const ADD_DATA = 'ADD_DATA'
const GET_DATA = 'GET_DATA'
export const addData = data => ({
  type: ADD_DATA,
  data
})
//ignore-prettier
export const postData = data => async dispatch => {
  try {
    const body = await axios.post('/api/data', data)

    dispatch(addData(body.data))
  } catch (err) {
    console.error(err)
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return state
    case ADD_DATA:
      return [...state, action.data]
    default:
      return state
  }
}
