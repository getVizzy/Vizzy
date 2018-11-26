import React from 'react'

import {
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
}
from 'victory'

export default class CustomTheme extends React.Component {
  render() {
    const styles = this.getStyles();
    const dataSetOne = this.getDataSetOne();
    const dataSetTwo = this.getDataSetTwo();
    const tickValues = this.getTickValues();

    return (
      <div style={{marginLeft: '100px', marginTop: '30px'}}>
        <svg style={styles.parent} viewBox="0 0 400 700">

          {/* Create stylistic elements */}
          <rect x="0" y="0" width="10" height="30" fill="#C51B7D"/>
          <rect x="420" y="10" width="20" height="20" fill="#E9A3C9"/>

          {/* Define labels */}
          <VictoryLabel x={25} y={24} style={styles.title}
            text="For Example: A Spurious Correlation..."
          />
          <VictoryLabel x={25} y={350} style={styles.subtitle}
            text="Correlation drawn from tylervigen.com/spurious-correlations"
          />

          <VictoryLabel x={25} y={55} style={styles.labelOne}
            text={"Number of letters in winning word\nof Scripps National Spelling Bee"}
          />
          <VictoryLabel x={425} y={55} style={styles.labelTwo}
            text={"Number of people\n killed by venomous spiders"}
          />

          <g transform={"translate(0, 40)"}>
            {/* Add shared independent axis */}
            <VictoryAxis
              scale="time"
              standalone={false}
              style={styles.axisYears}
              tickValues={tickValues}
              tickFormat={
                (x) => {
                  if (x.getFullYear() % 2 === 1) {
                    return x.getFullYear();
                  }
                }
              }
            />

            {/*
              Add the dependent axis for the first data set.
              Note that all components plotted against this axis will have the same y domain
            */}
            <VictoryAxis dependentAxis
              domain={[5, 15]}
              offsetX={50}
              orientation="left"
              standalone={false}
              style={styles.axisOne}
            />

            {/* Red annotation line
            <VictoryLine
              data={[
                {x: new Date(1999, 1, 1), y: 0},
                {x: new Date(2014, 6, 1), y: 0}
              ]}
              domain={{
                x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
                y: [-10, 15]
              }}
              scale={{x: "time", y: "linear"}}
              standalone={false}
              style={styles.lineThree}
            /> */}

            {/* dataset one */}
            <VictoryLine
              data={dataSetOne}
              domain={{
                x: [new Date(1998, 1, 1), new Date(2010, 1, 1)],
                y: [5, 15]
              }}
              interpolation="monotoneX"
              scale={{x: "time", y: "linear"}}
              standalone={false}
              style={styles.lineOne}
            />

            {/*
              Add the dependent axis for the second data set.
              Note that all components plotted against this axis will have the same y domain
            */}
            <VictoryAxis dependentAxis
              domain={[0, 15]}
              orientation="right"
              standalone={false}
              style={styles.axisTwo}
            />

            {/* dataset two */}
            <VictoryLine
              data={dataSetTwo}
              domain={{
                x: [new Date(1998, 1, 1), new Date(2010, 1, 1)],
                y: [0, 15]
              }}
              interpolation="monotoneX"
              scale={{x: "time", y: "linear"}}
              standalone={false}
              style={styles.lineTwo}
            />
          </g>
        </svg>
      </div>
    );
  }

  getDataSetOne() {
    return [
      {x: new Date(1999, 1, 1), y: 9},
      {x: new Date(2000, 1, 1), y: 8},
      {x: new Date(2001, 1, 1), y: 11},
      {x: new Date(2002, 1, 1), y: 12},
      {x: new Date(2003, 1, 1), y: 11},
      {x: new Date(2004, 1, 1), y: 13},
      {x: new Date(2005, 1, 1), y: 12},
      {x: new Date(2006, 1, 1), y: 9},
      {x: new Date(2007, 1, 1), y: 9},
      {x: new Date(2008, 1, 1), y: 7},
      {x: new Date(2009, 1, 1), y: 9},
    ];
  }

  getDataSetTwo() {
    return [
      {x: new Date(1999, 1, 1), y: 6},
      {x: new Date(2000, 1, 1), y: 5},
      {x: new Date(2001, 1, 1), y: 5},
      {x: new Date(2002, 1, 1), y: 10},
      {x: new Date(2003, 1, 1), y: 8},
      {x: new Date(2004, 1, 1), y: 14},
      {x: new Date(2005, 1, 1), y: 10},
      {x: new Date(2006, 1, 1), y: 4},
      {x: new Date(2007, 2, 1), y: 8},
      {x: new Date(2008, 1, 1), y: 5},
      {x: new Date(2009, 1, 1), y: 6},
    ];
  }

  getTickValues() {
    return [
      new Date(1998, 1, 1),
      new Date(1999, 1, 1),
      new Date(2000, 1, 1),
      new Date(2001, 1, 1),
      new Date(2002, 1, 1),
      new Date(2003, 1, 1),
      new Date(2004, 1, 1),
      new Date(2005, 1, 1),
      new Date(2006, 1, 1),
      new Date(2007, 1, 1),
      new Date(2008, 1, 1),
      new Date(2009, 1, 1),
      new Date(2010, 1, 1),
    ];
  }

  getStyles() {
    const BLUE_COLOR = "#4575B4";
    const RED_COLOR = "#5ab4ac";

    return {
      parent: {
        background: "white",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "100%",
        height: "auto"
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#808080",
        fontFamily: "inherit",
        fontSize: "18px",
        fontWeight: "bold",
        fontStyle: "italic"
      },
      subtitle: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#000000",
        fontFamily: "inherit",
        fontSize: "8px",
        fontStyle: "italic"
      },
      labelNumber: {
        textAnchor: "middle",
        fill: "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px"
      },

      // INDEPENDENT AXIS
      axisYears: {
        axis: { stroke: "black", strokeWidth: 1},
        ticks: {
          size: (tick) => {
            const tickSize =
              10;
            return tickSize;
          },
          stroke: "black",
          strokeWidth: 1
        },
        tickLabels: {
          fill: "black",
          fontFamily: "inherit",
          fontSize: 16
        }
      },

      // DATA SET ONE
      axisOne: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "#ccdee8",
          strokeWidth: 2
        },
        axis: { stroke: BLUE_COLOR, strokeWidth: 0 },
        ticks: { strokeWidth: 0 },
        tickLabels: {
          fill: BLUE_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelOne: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineOne: {
        data: { stroke: BLUE_COLOR, strokeWidth: 4.5 }
      },
      axisOneCustomLabel: {
        fill: BLUE_COLOR,
        fontFamily: "inherit",
        fontWeight: 300,
        fontSize: 21
      },

      // DATA SET TWO
      axisTwo: {
        axis: { stroke: RED_COLOR, strokeWidth: 0 },
        tickLabels: {
          fill: RED_COLOR,
          fontFamily: "inherit",
          fontSize: 16
        }
      },
      labelTwo: {
        textAnchor: "end",
        fill: RED_COLOR,
        fontFamily: "inherit",
        fontSize: 12,
        fontStyle: "italic"
      },
      lineTwo: {
        data: { stroke: RED_COLOR, strokeWidth: 4.5 }
      },
    };
  }
}
