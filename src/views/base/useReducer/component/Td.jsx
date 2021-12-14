import React, { useContext } from 'react'
import { tableContext } from '../Reducer'

const Td = () => {
  const { dispatch, cellText } = useContext(tableContext)
  const onClickCell = () => {
    dispatch({ type: 'CLICK_CELL' })
  }
  return (
    <>
      <td onClick={onClickCell}>{cellText}</td>
    </>
  )
}

export default Td
