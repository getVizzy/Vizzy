const axios = require('axios')

const initialState = []
const ADD_DATA = 'ADD_DATA'
const GET_DATA = 'GET_DATA'
export const addData = data => ({
  type: ADD_DATA,
  data
})

export const getData = data => ({
  type: GET_DATA,
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

export const gotData = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/data')
    dispatch(getData(data))
  } catch (err) {
    console.error(err)
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return [...action.data]
    case ADD_DATA:
      return [...state, action.data]
    default:
      return state
  }
}
