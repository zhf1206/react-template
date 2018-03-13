
/**
 * state
 */
const defaultState = {
  user: '',
  msg: '',
  refresh: 1
}
export const homeApp = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text
        }
      ]
    default:
      return state
  }
}