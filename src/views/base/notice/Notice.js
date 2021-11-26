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
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const Notice = () => {
  const [data, setData] = useState([])

  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
  }

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
            {data.map((e, i) => {
              return (
                <>
                  <CTableRow>
                    <CTableDataCell key={e.ID}>{e.ID}</CTableDataCell>
                    <CTableDataCell key={e.SUBJECT}>{e.SUBJECT}</CTableDataCell>
                    <CTableDataCell key={e.CONTENT}>{e.CONTENT}</CTableDataCell>
                    <CTableDataCell key={e.CREATED}>{e.CREATED}</CTableDataCell>
                    <CTableDataCell key={e.MODIFIED}>{e.MODIFIED}</CTableDataCell>
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
          {data.map((e, i) => {
            return (
              <>
                <CPaginationItem>{i + 1}</CPaginationItem>
              </>
            )
          })}
          <CPaginationItem aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  )
}
export default Notice
