import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Bar from "./Bar";
import { range as d3Range } from "d3";

let run = null;
let counter = 0;
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginLeft: '50px'
};

export default class CoverGraphContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      data: d3Range(34).map(Math.random),
      currentIndex: null
    }
    this.addData = this.addData.bind(this);
    this.setCurrentIndex = this.setCurrentIndex.bind(this)
    this.removeData = this.removeData.bind(this);
  }

  componentDidMount() {
    run = setInterval(this.addData, 100)
  }

  addData() {
    counter ++;
    if(counter < 30) {
      this.setState({
        data: [...this.state.data, Math.random()]
      })
    } else {
      clearInterval(run)
      run = setInterval(this.removeData, 100)
    }
  }

  removeData() {
    counter++;
    if(counter < 60) {
      this.setState({
        data: [...this.state.data.slice(0, this.state.data.length-1)]
      })
    } else {
      clearInterval(run)
    }
  }

  setCurrentIndex(currentIndex) {
    this.setState({
      currentIndex
    })
  }

  render() {
    const { data, currentIndex } = this.state;
    console.log()
    return (
      <MuiThemeProvider>
        <div style={styles}>
          <svg width="100%" height="150" onClick={() => clearInterval(run)}>
            <Bar
              data={data}
              width={250}
              height={125}
              x={0}
              y={0}
              highlightBar={this.setCurrentIndex}
              highlightedBar={currentIndex}
            />
          </svg>
        </div>
      </MuiThemeProvider>
    );
  }
}

