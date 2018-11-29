const axios = require('axios')

const initialState = []
const ADD_DATA = 'ADD_DATA'
const GET_DATA = 'GET_DATA'
const DELETE_DATA = 'DELETE_DATA'

export const addData = data => ({
  type: ADD_DATA,
  data
})

export const getData = data => ({
  type: GET_DATA,
  data
})

export const deleteData = id => ({
  type: DELETE_DATA,
  id
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

export const deletingData = id => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/api/data/${id}`)
      const action = deleteData(id)
      dispatch(action)
    } catch (error) {
      console.error(error)
    }
  }
}

export const gotData = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/data')
    dispatch(getData(data))
  } catch (err) {
    console.error(err)
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return [...action.data]
    case ADD_DATA:
      return [...state, action.data]
    case DELETE_DATA:
      const newList = state.filter(data => data.id !== action.id)
      return newList
    default:
      return state
  }
}
