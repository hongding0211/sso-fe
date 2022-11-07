import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    phone: '',
    avatar: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.avatar = action.payload.avatar
      state.phone = action.payload.phone
      state.email = action.payload.email
      state.name = action.payload.name
    },
    resetUser: state => {
      state.avatar = ''
      state.phone = ''
      state.email = ''
      state.name = ''
    }
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
