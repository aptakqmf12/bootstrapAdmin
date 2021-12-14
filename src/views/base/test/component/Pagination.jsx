import React, { useState, useContext } from 'react'
import RCPagination from 'rc-pagination'
import '../../../../../node_modules/rc-pagination/assets/index.css'

const Pagination = ({ setCurrentPage, currentPage, totalPage, perPage }) => {
  return (
    <>
      <RCPagination
        onChange={(page) => {
          setCurrentPage(page)
        }}
        current={currentPage}
        total={totalPage}
        pageSize={perPage}
      />
    </>
  )
}

export default Pagination
