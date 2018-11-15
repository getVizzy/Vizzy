import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'
import { addData } from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onChange(e) {
    let files = e.target.files
    let reader = new FileReader()
    reader.readAsText(files[0])
    reader.onload = (e) => {

      var csv = reader.result;
      var lines = csv.split("\r").join("").split("\n");
      var result = [];
      var headers=lines[0].split(",");
      for(var i=1;i<lines.length;i++){
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      result= JSON.stringify(result);
      this.props.addData(result);
    }

    this.setState({
      files: [...this.state.files, files[0]]
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
          <Dropzone onDrop={this.onDrop} className="dropzone"
            onChange={(e) => this.onChange(e)} >
            <p className="dz-message">Drop files here or <button>Choose file</button></p>
          </Dropzone>
        </div>
        <div>
          {
          this.state.files.map(f => <p key={f.name}>{f.name} {f.size + " bytes"}</p>)
          }
        </div>
        <div>
          {
            this.state.files.length ?
            <button>
              <Link to="/dashboard">Done</Link>
            </button>
            : <div />
          }
        </div>
      </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.user.data
})

const mapDispatchToProps = (dispatch) => ({
  addData: (data) => dispatch(addData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(FileDrop)
