import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
Modal.setAppElement('#root')
const AddModal = ({
  addModal,
  setAddModal,
  onSubmitForm,
  onChangeInput,
  focusInput,
  SUBJECT,
  CONTENT,
  setInputs,
}) => {
  const closeModal = () => {
    setAddModal(false)
    setInputs({
      SUBJECT: '',
      CONTENT: '',
    })
  }
  return (
    <>
      <Modal
        isOpen={addModal}
        onRequestClose={() => setAddModal(false)}
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

        <button className="modal__btn--close" onClick={closeModal}>
          창 닫기
        </button>
      </Modal>
    </>
  )
}

export default AddModal
