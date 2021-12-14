import React, { useContext } from 'react'
import { tableContext } from '../Reducer'

const Another = () => {
  const { dispatch, cellText } = useContext(tableContext)
  return (
    <>
      <div>어나더레븰!{cellText}</div>
    </>
  )
}

export default Another
