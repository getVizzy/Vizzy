import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'

export default class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
      modalIsOpen: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onDrop(file) {
    this.setState({
      files: [...this.state.files, file]
    });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
      <button onClick={this.openModal}>Import Data</button>
      <Modal isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
            ariaHideApp={false}
              className="modal">
        <div>
          <Dropzone onDrop={this.onDrop} accept="text/csv, application/vnd.ms-excel" className="dropzone">
            <p className="dz-message">Drop files here or <button>Choose file</button></p>
          </Dropzone>
        </div>
        <div>
          {
          this.state.files.map(f => <p key={f[0].name}>{f[0].name} {f[0].size + " bytes"}</p>)
          }
        </div>
        <div>
          {
            this.state.files.length ?
            <button>Done</button>
            : <div />
          }
        </div>
      </Modal>
      </div>
    )
  }
}

