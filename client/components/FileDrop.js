import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'
import {postData} from '../store/data'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import Ionicon from 'react-ionicons'


class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      // files: [],
      modalIsOpen: false,
      data: {},
      view: 'select',
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggle = this.toggle.bind(this)

  }

async onChange(e) {
    let files = e.target.files
    let reader = new FileReader()
    await reader.readAsText(files[0])
    let result = []
    reader.onload = e => {
      let csv = reader.result
      let lines = csv
        .split('\r')
        .join('')
        .split('\n')

      console.log("LINES", lines)

      let headers = lines[0].split(',')

      for (var i = 1; i < lines.length; i++) {
        if(lines[i][0] !== ",") {
          console.log("ONE LINE", lines[i])
          let currentline = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

          let obj = {}
          for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
          }
          if(Object.keys(obj)[0] !== '' && Object.values(obj)[0]) {
            result.push(obj)
          }
        }
      }
    }
    await this.toggle('upload')

    this.setState({
      data: {
        name: files[0].name,
        data: result,
        view: 'upload'
      }
    })
  }

  toggle(element) {
    this.setState({
      view: element
    })
  }

  openModal() {
    this.setState({
      modalIsOpen: true})
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      view: 'select',
      data: {}
    })
  }

  render() {
    const {classes} = this.props
    let name = this.state.data.name || ''
    return (
      <div>
        <Button
          size="small"
          color="primary"
          onClick={this.openModal}>
          Import Here
        </Button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          className="modal"
        >
        {this.state.view === 'select' ?
          <div id="dropzone-div">
            <Dropzone
              accept="text/csv"
              onDrop={this.onDrop}
              className="dropzone"
              onChange={e => this.onChange(e)}>
                <div className="dz-message">
                  <p>Please upload a .csv file.</p>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    >
                    Choose a file
                  </Button>
                </div>
            </Dropzone>
          </div>
          : this.state.view === 'upload' ?
              <div className="dz-message">
                <p>Selected file:
                  <strong>{` ${name}`}</strong>
                </p>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                    this.props.addData(this.state.data);
                    this.toggle('progress');
                  }}>
                  Upload and Save
                </Button>
              </div>
            : this.state.view === 'progress' ?
                <div className="dz-message-2">
                  <p><Ionicon icon="md-heart" fontSize="60px" color="#3bc2ea" beat={true} /></p>
                  <p>Got it!</p>
                  <Button
                  onClick={this.closeModal}
                  variant="outlined"
                  color="primary"
                  size="small">
                    Get vizzy!
                  </Button>
                </div>
              : '' }
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

// export default connect(mapStateToProps, mapDispatchToProps)(
//   withStyles(styles)(FileDrop)
// )
