import React, { useReducer, createContext } from 'react'
import Table from './component/Table'
import Another from './component/Another'

export const tableContext = createContext({
  tableText: '',
  cellText: '',
  dispatch: () => {},
})

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLICK_CELL':
      return { ...state, cellText: 'tdClickd' }
    case 'CLICK_TABLE':
      return { ...state, tableText: 'tableClicked' }
    default:
      return state
  }
}
const initialState = {
  tableText: 'tableText',
  cellText: 'cell',
}

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = {
    tableText: state.tableText,
    cellText: state.cellText,
    dispatch,
  }
  return (
    <>
      <tableContext.Provider value={value}>
        <Table />
        <Another />
      </tableContext.Provider>
    </>
  )
}

export default Reducer
