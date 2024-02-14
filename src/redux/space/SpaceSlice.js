import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    spaces: [],
    viewFormEditSpace: false,
    spaceToEdit: null,
    spacesToDelete: [],
    contextSpace: ''
}

export const SpaceSlice = createSlice({
    name: 'space',
    initialState: initialState,
    reducers: {
        setViewFormEditSpace: (state, action)=>{
            state.viewFormEditSpace = action.payload
        },
        setSpaceToEdit: (state, action)=>{
            state.spaceToEdit = action.payload
        },
        updateSpace: (state, action)=>{
            let title = action.payload.title
            let spaceId = action.payload.spaceId
            let color = action.payload.color

            let index = state.spaces.findIndex(s => {
                return s.id === spaceId
            })

            state.spaces[index].title = title
            state.spaces[index].color = color
            state.viewFormEditSpace = false
            state.spaceToEdit = null
        },
        setSpaceToDelete: (state, action) => {
            state.spacesToDelete = action.payload
        },
        addSpaceToDelete: (state, action) => {
            state.spacesToDelete.push(action.payload)
        },
        removeSpaceToDelete: (state, action) => {
            state.spacesToDelete = state.spacesToDelete.filter(s => s !== action.payload)
        },
        deleteSpaces: (state, action) => {
            state.spaces = state.spaces.filter(space => !state.spacesToDelete.includes(space.id))
            state.spacesToDelete = []
        },
        setContextSpace: (state, action) => {
            state.contextSpace = action.payload
        },
        addSpace: (state, action) => {
            let title = action.payload.title
            let color = action.payload.color

            let newSpace = {
                id: uuidv4(),
                title,
                color
            }

            let spacesStorage = JSON.parse(localStorage.getItem('spaces'))
            spacesStorage.push(newSpace)
            localStorage.setItem('spaces', JSON.stringify(spacesStorage))

            state.spaces.push(newSpace)
            state.viewFormEditSpace = false
        },
        setSpaces: (state, action) => {
            state.spaces = action.payload
        },
    }
})

export const {
    setSpaces,
    setViewFormEditSpace,
    setSpaceToEdit,
    updateSpace,
    addSpaceToDelete,
    removeSpaceToDelete,
    deleteSpaces,
    addSpace,
    setContextSpace
} = SpaceSlice.actions

export default SpaceSlice.reducer

