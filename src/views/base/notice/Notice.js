import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import AddModal from './component/AddModal'
import DataTable from './component/DataTable'
import PropTypes from 'prop-types'

const Notice = () => {
  //state
  const [list, setList] = useState([])
  const [inputs, setInputs] = useState({
    SUBJECT: '',
    CONTENT: '',
  })
  const [addModal, setAddModal] = useState(false)

  const { SUBJECT, CONTENT } = inputs
  const focusInput = useRef()

  useEffect(() => {
    try {
      getData()
    } catch (e) {
      console.error(e.message)
    }
  }, [])

  //method
  const getData = async () => {
    await axios.get(`http://localhost:3005/api/notice/list`).then((res) => setList(res.data.data))
  }
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
  const deleteData = (idx) => {
    setList(list.filter((e) => e.ID !== idx))
    axios.post('http://localhost:3005/api/notice/remove', {
      id: idx,
    })
  }

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
    setAddModal(false)
  }

  return (
    <>
      <DataTable
        list={list}
        setList={setList}
        setAddModal={setAddModal}
        getData={getData}
        deleteData={deleteData}
        onChangeInput={onChangeInput}
        SUBJECT={SUBJECT}
        CONTENT={CONTENT}
      />

      <AddModal
        addModal={addModal}
        setAddModal={setAddModal}
        onSubmitForm={onSubmitForm}
        onChangeInput={onChangeInput}
        focusInput={focusInput}
        SUBJECT={SUBJECT}
        CONTENT={CONTENT}
      />
    </>
  )
}

Notice.propsTypes = {
  modal: PropTypes.bool.isRequired,
}

export default Notice
