import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import axios from 'axios'

Modal.setAppElement('#root')
const ModifyModal = ({
  modifyModal,
  setModifyModal,
  modifyIndex, //수정글의 id
  list,
  setList,
  getData,
  onChangeInput,
  SUBJECT,
  CONTENT,
}) => {
  const onSubmitFormModify = () => async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3005/api/notice/update', {
      id: modifyIndex,
      subject: SUBJECT,
      content: CONTENT,
    })
    await getData()
    setModifyModal(false)
  }

  return (
    <>
      <Modal
        isOpen={modifyModal}
        onRequestClose={() => setModifyModal(false)}
        style={{ overlay: { zIndex: 9999999 } }}
      >
        <form onSubmit={onSubmitFormModify()}>
          <fieldset>
            <legend>게시글 수정</legend>

            <label htmlFor="SUBJECT"></label>
            <textarea
              name="SUBJECT"
              className="SUBJECT"
              value={SUBJECT}
              onChange={onChangeInput}
            ></textarea>

            <label htmlFor="CONTENT"></label>
            <textarea
              name="CONTENT"
              className="CONTENT"
              value={CONTENT}
              onChange={onChangeInput}
            ></textarea>

            <button type="submit">수정</button>
          </fieldset>
        </form>
        <button className="modal__btn--close" onClick={() => setModifyModal(false)}>
          창 닫기
        </button>
      </Modal>
    </>
  )
}

export default ModifyModal
