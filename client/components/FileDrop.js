import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'
import {postData} from '../store/data'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      // files: [],
      modalIsOpen: false,
      data: {}
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  async onChange(e) {
    let files = e.target.files
    let reader = new FileReader()
    await reader.readAsText(files[0])
    let result = []
    reader.onload = e => {
      var csv = reader.result
      var lines = csv
        .split('\r')
        .join('')
        .split('\n')
      // var result = []
      var headers = lines[0].split(',')
      for (var i = 1; i < lines.length; i++) {
        var obj = {}
        var currentline = lines[i].split(',')
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j]
        }
        result.push(obj)
      }
    }
    this.setState({
      data: {
        name: files[0].name,
        data: result
      }
    })

    // this.setState({
    //   files: [...this.state.files, files[0]]
    // })
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({modalIsOpen: false})
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Import Data</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          className="modal"
        >
          <div>
            <Dropzone
              onDrop={this.onDrop}
              className="dropzone"
              onChange={e => this.onChange(e)}
            >
              <p className="dz-message">
                Drop files here or <button>Choose file</button>
              </p>
            </Dropzone>
          </div>
          <div>{/* {f.name} {this.data.size + ' bytes'} */}</div>
          <div>
            <button onClick={() => {
              this.props.addData(this.state.data);
              this.closeModal()
              }}>Done</button>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
})

const mapDispatchToProps = dispatch => ({
  addData: data => dispatch(postData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FileDrop)
