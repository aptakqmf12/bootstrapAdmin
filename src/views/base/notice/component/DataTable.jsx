import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import RCPagination from 'rc-pagination'
import ModifyModal from './ModifyModal'
import '../../../../../node_modules/rc-pagination/assets/index.css'

const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
}
const writeBox = {
  display: 'flex',
  justifyContent: 'flex-end',
}

const DataTable = ({
  list,
  setList,
  setAddModal,
  getData,
  deleteData,
  onChangeInput,
  SUBJECT,
  CONTENT,
}) => {
  const [pageSize, setPageSize] = useState(10)
  const [modifyModal, setModifyModal] = useState(false)
  const [modifyIndex, setModifyIndex] = useState(0)
  // pagination
  const [currentPage, setCurrentPage] = useState(3)

  const onChangePagination = (page) => {
    setCurrentPage(page)
  }

  const openModifyModal = (idx) => {
    console.log(idx)
    setModifyModal(true)
    setModifyIndex(idx)
    //여기서 받은 idx값을 ModifyModal에 전달해주고
    // ModifyModal에서는 해당 idx값을 가진 요소의 제목,콘텐츠를 바꾼다
  }
  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>게시판</strong> <small>{pageSize}개씩 출력</small>
        </CCardHeader>
        <CCardBody>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">id</CTableHeaderCell>
                <CTableHeaderCell scope="col">제목</CTableHeaderCell>
                <CTableHeaderCell scope="col">내용</CTableHeaderCell>
                <CTableHeaderCell scope="col">게시날짜</CTableHeaderCell>
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
                      <CTableDataCell>{e.CREATED}</CTableDataCell>
                      <CTableDataCell>
                        <button
                          onClick={() => {
                            deleteData(e.ID)
                          }}
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => {
                            openModifyModal(e.ID)
                          }}
                        >
                          수정
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
            pageSize={pageSize}
            current={currentPage}
            total={list.length}
          />
        </CCardBody>
      </CCard>

      <div style={writeBox}>
        <button type="button" onClick={() => setAddModal(true)}>
          글쓰기
        </button>
      </div>

      <ModifyModal
        modifyModal={modifyModal}
        setModifyModal={setModifyModal}
        modifyIndex={modifyIndex}
        list={list}
        setList={setList}
        getData={getData}
        onChangeInput={onChangeInput}
        SUBJECT={SUBJECT}
        CONTENT={CONTENT}
      />
    </>
  )
}

export default DataTable
