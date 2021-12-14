import React from 'react'

const DataList = ({ slicedData }) => {
  return (
    <>
      <ul>
        <li>
          {slicedData &&
            slicedData.map((e, i) => {
              return <li key={i}>{e.CONTENT}</li>
            })}
        </li>
      </ul>
    </>
  )
}

export default DataList
