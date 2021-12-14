import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import AddModal from './component/AddModal'
import DataTable from './component/DataTable'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Notice = () => {
  //state
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([])
  const [inputs, setInputs] = useState({
    SUBJECT: '',
    CONTENT: '',
  })
  const { SUBJECT, CONTENT } = inputs
  const [addModal, setAddModal] = useState(false)
  const focusInput = useRef()

  // useEffect(() => {
  //   setLoading(true)
  // }, [])

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
    setLoading(true)
  }
  const addData = async (subjectValue, contentValue) => {
    try {
      const res = await axios.post('http://localhost:3005/api/notice/create', {
        subject: subjectValue,
        content: contentValue,
      })

      getData()
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
          SUBJECT: SUBJECT,
          CONTENT: CONTENT,
        },
      ]) //불변성 지킬필요없는지 삭제 해보기
      addData(SUBJECT, CONTENT)

      setInputs({
        SUBJECT: '',
        CONTENT: '',
      })
    } else {
      alert('값을 입력해주세요')
    }
    getData() //post후에 바로 반영되도록 get
    focusInput.current.focus() //확인

    setAddModal(false)
  }

  return (
    <>
      {loading ?? <div>loading</div>}

      <DataTable
        list={list}
        setList={setList}
        setAddModal={setAddModal}
        getData={getData}
        deleteData={deleteData}
        onChangeInput={onChangeInput}
        SUBJECT={SUBJECT}
        CONTENT={CONTENT}
        setInputs={setInputs}
      />

      <AddModal
        addModal={addModal}
        setAddModal={setAddModal}
        onSubmitForm={onSubmitForm}
        onChangeInput={onChangeInput}
        focusInput={focusInput}
        SUBJECT={SUBJECT}
        CONTENT={CONTENT}
        setInputs={setInputs}
      />
    </>
  )
}

// export const Loading = () => {
//   const LoadingBox = styled.div``
//   return <div style={style}>loading</div>
// }

Notice.propsTypes = {
  modal: PropTypes.bool.isRequired,
}

export default Notice
