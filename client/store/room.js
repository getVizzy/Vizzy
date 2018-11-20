import axios from 'axios'
import history from '../history'

//array with all the room keys
const initialState = []

//ACTION TYPES
export const ADD_ROOM = 'ADD_ROOM'
export const GOT_ROOMS = 'GOT_ROOMS'



//ACTION CREATORS
export const addRoom = (room) => ({
  type: ADD_ROOM,
  room
})

export const gotRooms = (rooms) => ({
  type: GOT_ROOMS,
  rooms
})

//THUNK CREATORS
export const postRoom = (newRoom) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/room`, newRoom)
      const room = response.data
      const action = addRoom(room)
      dispatch(action)
    }
    catch (err) { console.log(err) }
  }
}

export const fetchRooms = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/room`)
      const rooms = response.data
      console.log('THUNK ROOMS', rooms)
      const action = gotRooms(rooms)
      dispatch(action)

    }
    catch (err) { console.log(err) }
  }
}


//REVIEW REDUCER
export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return [...state, action.room]
    case GOT_ROOMS:
      return action.rooms
    default:
      return state
  }
}
