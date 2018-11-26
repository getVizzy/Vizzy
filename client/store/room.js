import axios from 'axios'
import history from '../history'

//array with all the room keys
const initialState = {
  rooms: [],
  singleRoom: ''
}

//ACTION TYPES
export const ADD_ROOM = 'ADD_ROOM'
export const GOT_ROOMS = 'GOT_ROOMS'
export const GOT_SINGLE_ROOM = 'GOT_ROOM'



//ACTION CREATORS
export const addRoom = (room) => ({
  type: ADD_ROOM,
  room
})

export const gotRooms = (rooms) => ({
  type: GOT_ROOMS,
  rooms
})

export const gotSingleRoom = (room) => ({
  type: GOT_SINGLE_ROOM,
  room
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
      return { ...state, rooms: [...state.rooms, action.room] }
    case GOT_ROOMS:
      return { ...state, rooms: action.rooms }
    case GOT_SINGLE_ROOM:
      return { ...state, singleRoom: action.room }
    default:
      return state
  }
}
