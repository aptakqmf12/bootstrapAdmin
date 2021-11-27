import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Pagination from 'rc-pagination'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Notice = () => {
  const [data, setData] = useState([])
  const [value, setValue] = useState({
    ID: 0,
    SUBJECT: '23',
    CONTENT: '43',
    CRADTED: new Date(),
    MODIFIED: new Date(),
  })

  const onChangeInput = (e) => {}

  const onSubmitForm = (e) => {
    e.preventDefault()
    alert('add')
    setData([
      ...data,
      {
        //post 보낼땐 camel케이스로.
        ID: data.length + 1,
        SUBJECT: 1,
        CONTENT: 2,
        CRADTED: new Date(),
        MODIFIED: new Date(),
      },
    ])
  }

  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
  }

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:3005/api/notice/list')
      setData(res.data.data)
    }
    return fetchData()
  }, [])

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>게시판</strong> <small>Fetch</small>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">id</CTableHeaderCell>
                <CTableHeaderCell scope="col">SUBJECT</CTableHeaderCell>
                <CTableHeaderCell scope="col">CONTENT</CTableHeaderCell>
                <CTableHeaderCell scope="col">CREATED</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {data.map((e, i) => {
                return (
                  <>
                    <CTableRow key={e.id}>
                      <CTableDataCell>{e.ID}</CTableDataCell>
                      <CTableDataCell>{e.SUBJECT}</CTableDataCell>
                      <CTableDataCell>{e.CONTENT}</CTableDataCell>
                      <CTableDataCell>{e.CREATED}</CTableDataCell>
                    </CTableRow>
                  </>
                )
              })}
            </CTableBody>
          </CTable>

          <CPagination aria-label="Page navigation example" style={styleCenter}>
            <CPaginationItem aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>

            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
      <div>
        <form onSubmit={onSubmitForm}>
          <fieldset>
            <legend>게시글 추가</legend>

            <label htmlFor={'CONTENT'}>게시글 CONTENT</label>
            <input
              name="content"
              className="CONTENT"
              value={value.CONTENT}
              onChange={onChangeInput}
            ></input>

            <label htmlFor={'SUBJECT'}>게시글 SUBJECT</label>
            <input
              name="subject"
              className="SUBJECT"
              value={value.SUBJECT}
              onChange={onChangeInput}
            ></input>

            <button type="submit">추가!</button>
          </fieldset>
        </form>
      </div>
    </>
  )
}
export default Notice
