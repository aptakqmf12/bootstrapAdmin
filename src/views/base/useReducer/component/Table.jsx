import React, { useContext } from 'react'
import { tableContext } from '../Reducer'
import Tr from './Tr'

const Table = () => {
  const { dispatch, tableText } = useContext(tableContext)
  const onCLickTableText = () => {
    dispatch({ type: 'CLICK_TABLE' })
  }

  return (
    <>
      <table>
        <tbody>
          <Tr />
        </tbody>
      </table>
      <div onClick={onCLickTableText}>{tableText}</div>
    </>
  )
}

export default Table
