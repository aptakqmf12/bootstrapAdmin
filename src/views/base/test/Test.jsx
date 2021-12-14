import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useSwr from 'swr'
import '../../../../node_modules/rc-pagination/assets/index.css'
import DataList from './component/DataList'
import Pagination from './component/Pagination'

const Test = () => {
  const fetcher = async (url) => {
    const res = await axios.get(url)
    setTotalPage(res.data.data.length)
    return res.data.data
  }
  const { data, mutate } = useSwr(`http://localhost:3005/api/notice/list`, fetcher)

  const [name, setName] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const lastIndex = currentPage * perPage
  const firstIndex = lastIndex - perPage
  const slicedData = data && data.slice(firstIndex, lastIndex)

  const creatItem = async (e) => {
    const currentCache = data
    mutate([...data, { content: name }], false)
    const res = await axios.post('http://localhost:3005/api/notice/create', {
      content: name,
    })
  }

  return (
    <>
      <div>
        <form>
          <input onChange={(e) => setName(e.target.value)} value={name}></input>
          <button onClick={creatItem}>add</button>
          <div>{name}</div>
        </form>
      </div>

      <DataList slicedData={slicedData} />

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPage={totalPage}
        perPage={perPage}
      />
    </>
  )
}

export default Test
