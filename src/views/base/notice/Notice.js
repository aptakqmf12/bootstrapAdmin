import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import RCPagination from 'rc-pagination'
// import '../../assets/index.less';
// import 'rc-select/assets/index.less';
import '../../../../node_modules/rc-pagination/assets/index.css'
import Modal from 'react-modal'
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
Modal.setAppElement('#root')
const Notice = () => {
  //style
  const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
  }
  const writeBox = {
    display: 'flex',
    justifyContent: 'flex-end',
  }
  // var
  const [list, setList] = useState([])
  const [inputs, setInputs] = useState({
    SUBJECT: '',
    CONTENT: '',
  })
  const [modal, setModal] = useState(false)
  // pagination
  const [currentPage, setCurrentPage] = useState(3)
  const { SUBJECT, CONTENT } = inputs
  const focusInput = useRef()

  useEffect(async () => {
    try {
      // const res = await axios.get('http://localhost:3005/api/notice/list', {})
      // setList(res.data.data)

      const res = await axios.get(`http://localhost:3005/api/notice/get?id=1`, {})
      console.log(res.data.data)
    } catch (e) {
      console.error(e.message)
    }
  }, [])

  const addData = async (subjectValue, contentValue) => {
    try {
      const res = await axios.post('http://localhost:3005/api/notice/create', {
        id: 0,
        subject: subjectValue,
        content: contentValue,
      })
    } catch (e) {
      console.log(e)
    }
  }

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
          ID: list.length + 1, //데이터로 받은 list다음에 붙이기
          SUBJECT: SUBJECT,
          CONTENT: CONTENT,
        },
      ])
      addData(SUBJECT, CONTENT)

      setInputs({
        SUBJECT: '',
        CONTENT: '',
      })
    } else {
      alert('값을 입력해주세요')
    }
    axios.get('http://localhost:3005/api/notice/list', {}) //post후에 바로 반영되도록 get
    focusInput.current.focus()
    setModal(false)
  }
  const onDeleteList = (idx) => {
    setList(list.filter((e) => e.ID !== idx))

    axios.post('http://localhost:3005/api/notice/remove', {
      id: idx,
    })
  }
  const onChangePagination = (page) => {
    setCurrentPage(page)
  }

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

          <RCPagination
            style={styleCenter}
            onChange={() => {
              onChangePagination(30)
            }}
            pageSize={5}
            current={currentPage}
            total={list.length}
          />
        </CCardBody>
      </CCard>

      <div style={writeBox}>
        <button type="button" onClick={() => setModal(true)}>
          글쓰기
        </button>
      </div>

      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{ overlay: { zIndex: 9999999 } }}
      >
        <form onSubmit={onSubmitForm} className="modal__form">
          <fieldset>
            <legend>게시글 추가</legend>
            <label htmlFor={'SUBJECT'}>SUBJECT</label>
            <textarea
              name="SUBJECT"
              className="SUBJECT"
              value={SUBJECT}
              onChange={onChangeInput}
              ref={focusInput}
            ></textarea>

            <label htmlFor={'CONTENT'}>CONTENT</label>
            <textarea
              name="CONTENT"
              className="CONTENT"
              value={CONTENT}
              onChange={onChangeInput}
            ></textarea>
            <button type="submit">글쓰기</button>
          </fieldset>
        </form>

        <button className="modal__btn--close" onClick={() => setModal(false)}>
          창 닫기
        </button>
      </Modal>
    </>
  )
}
export default Notice
