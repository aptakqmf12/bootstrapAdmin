import React, { useState, useEffect, useRef } from 'react'
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
  //style
  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
  }
  // var
  const [list, setList] = useState([])
  const [inputs, setInputs] = useState({
    SUBJECT: '',
    CONTENT: '',
  })
  const { SUBJECT, CONTENT } = inputs
  const focusInput = useRef()

  //methods
  const onChangeInput = (e) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value,
    })
  }
  const onSubmitForm = (e) => {
    e.preventDefault()
    if (SUBJECT !== '' && CONTENT !== '') {
      setList([
        ...list,
        {
          //post 보낼땐 camel케이스로.
          ID: 0,
          SUBJECT: SUBJECT,
          CONTENT: CONTENT,
        },
      ])

      setInputs({
        SUBJECT: '',
        CONTENT: '',
      })
    } else {
      alert('값을 입력해주세요')
    }
    focusInput.current.focus()
  }
  const onDeleteList = (idx) => {
    setList(list.filter((e) => e.ID !== idx))
  }
  //useEffect
  useEffect(() => {
    // async function fetchData() {
    //   const res = await axios.get('http://localhost:3005/api/notice/list')
    //   setList(res.data.data)
    // }
    // return fetchData()
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
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {list.map((e, i) => {
                return (
                  <>
                    <CTableRow key={e.id}>
                      <CTableDataCell>{e.ID}</CTableDataCell>
                      <CTableDataCell>{e.SUBJECT}</CTableDataCell>
                      <CTableDataCell>{e.CONTENT}</CTableDataCell>
                      <CTableDataCell>
                        <button
                          onClick={() => {
                            onDeleteList(e.ID)
                          }}
                        >
                          삭제
                        </button>
                      </CTableDataCell>
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
            <label htmlFor={'SUBJECT'}>게시글 SUBJECT</label>
            <input
              name="SUBJECT"
              className="SUBJECT"
              value={SUBJECT}
              onChange={onChangeInput}
              ref={focusInput}
            ></input>

            <label htmlFor={'CONTENT'}>게시글 CONTENT</label>
            <input
              name="CONTENT"
              className="CONTENT"
              value={CONTENT}
              onChange={onChangeInput}
            ></input>
            <button type="submit">go</button>
          </fieldset>
        </form>
      </div>

    </>
  )
}
export default Notice
