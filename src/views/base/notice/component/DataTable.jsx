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
  setInputs,
}) => {
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const lastIndex = currentPage * perPage
  const firstIndex = lastIndex - perPage
  const slicedList = list && list.slice(firstIndex, lastIndex)
  const onChangePagination = (page) => {
    setCurrentPage(page)
    console.log(page)
  }

  const [modifyModal, setModifyModal] = useState(false)
  const [modifyIndex, setModifyIndex] = useState(0)
  const openModifyModal = (idx) => {
    setModifyModal(true)
    setModifyIndex(idx)
  }
  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>게시판</strong> <small>{perPage}개씩 출력</small>
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
              {slicedList &&
                slicedList.map((e, i) => {
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
            onChange={(page) => {
              setCurrentPage(page)
            }}
            perPage={perPage}
            current={currentPage}
            total={list && list.length}
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
        setInputs={setInputs}
      />
    </>
  )
}

export default DataTable
