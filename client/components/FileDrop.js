import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'
import {postData} from '../store/data'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import {white} from 'material-ui/styles/colors'
import Ionicon from 'react-ionicons'
import CircularProgress from '@material-ui/core/CircularProgress';

class FileDrop extends Component {
  constructor() {
    super()
    this.state = {
      // files: [],
      modalIsOpen: false,
      data: {},
      upload: false,
      progress: false
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
      var csv = reader.result
      var lines = csv
        .split('\r')
        .join('')
        .split('\n')
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
  }

  toggle(element) {
    this.setState({
      [element]: true
    })
  }

  openModal() {
    this.setState({modalIsOpen: true})
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      upload: false,
      progress: false
    })
  }

  render() {
    const {classes} = this.props
    let name = this.state.data.name || ''
    return (
      <div>
        {/* <AddIcon onClick={this.openModal} className={classes.icon} /> */}
        <Button
          size="small"
          color="primary"
          onClick={this.openModal}>
          Import Here
        </Button>
        {/* <button onClick={this.openModal}>Import Data</button> */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          className="modal"
        >
          <div id="dropzone-div">
            <Dropzone
              accept="text/csv"
              onDrop={this.onDrop}
              className="dropzone"
              onChange={e => this.onChange(e)}>
              {!this.state.upload ?
                <div className="dz-message">
                  <p>Please upload a .csv file.</p>
                  <Button
                    onClick={this.closeModal}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => this.toggle('upload')}>
                    Choose a file
                  </Button>
                </div>
                : '' }
            </Dropzone>
          <div>
            {this.state.upload && !this.state.progress?
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
            : ''}
            {this.state.progress ?
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
            </div>
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

// export default connect(mapStateToProps, mapDispatchToProps)(
//   withStyles(styles)(FileDrop)
// )
