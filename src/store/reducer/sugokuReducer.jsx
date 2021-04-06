const initialState = {
  board: [],
  cloneBoard: [],
  loading: false
}

export default function sugokuReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'SUGOKU/FETCH_BOARD':
      return { ...state, board: payload }
    case 'SUGOKU/CLONE_BOARD':
      return { ...state, cloneBoard: payload }
    case 'SUGOKU/LOADING':
      return { ...state, loading: payload }
    default:
      return state
  }
}