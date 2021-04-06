export function setFetchBoard(payload) {
  return { type: 'SUGOKU/FETCH_BOARD', payload }
}

export function setLoading(payload) {
  return { type: 'SUGOKU/LOADING', payload }
}

export function setCloneBoard(payload) {
  return { type: 'SUGOKU/CLONE_BOARD', payload }
}

export function fetchBoard(payload) {
  // console.log(payload, '<<< PAYLOAD');
  const difficulty = payload
  // console.log(difficulty, '<<<<<<<< DARI ACTION');
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      const data = await response.json()
      dispatch(setFetchBoard(data.board))
      dispatch(setCloneBoard(data.board))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}