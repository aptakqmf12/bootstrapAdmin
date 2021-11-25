import React, { useState, useEffect } from 'react'
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
} from '@coreui/react'

const Notice = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/api/notice/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => setData(json.data))
  }, [])
  return (
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
              <CTableHeaderCell scope="col">MODIFIED</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            <CTableRow>
              {data.map((e, i) => {
                console.log(e.SUBJECT, i)
                return (
                  <>
                    <CTableDataCell key={e.ID + i}>{e.ID}</CTableDataCell>
                    <CTableDataCell key={e.SUBJECT + i}>{e.SUBJECT}</CTableDataCell>
                    <CTableDataCell key={e.CONTENT + i}>{e.CONTENT}</CTableDataCell>
                  </>
                )
              })}
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}
export default Notice
