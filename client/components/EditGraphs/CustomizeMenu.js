import React from 'react'
import { buildRegressionModel } from '../../utils'
import SimpleSelect from './SimpleSelect'
import PieColorOptions from '../Chart/PieColorOptions'

export const CustomizeMenu = function (props) {
  console.log("PROPS IN CUSTOMIZE", props)
  const changeStyle = props.changeStyle
  const graphData = props.graphData
  const graphSelected = props.graphSelected

  const filterColumn = function (data, dataType) {
    return Object.keys(data[0]).filter(key => typeof data[0][key] === dataType)
  }
  return (
    <div id="controls">
      <p>Choose a Dataset:</p>
      <select name="dataId" onChange={e => changeStyle(e, 'dataId')}>
        <option value='0'>Sample Data</option>
        {props.dataMatch.map((elem, i) => (
          <option key={i} value={elem.id}>
            {elem.id}
          </option>
        ))}
      </select>
      {/* <p>Left Axis:</p> */}
      {/* <select name="y" onChange={e => changeStyle(e, 'y')}>
        <option />
        {Object.keys(graphData[0]).map((key, i) => {
          return filterColumn(graphData, 'number', key, i)
        })}
      </select> */}

      {/* <p>Bottom Axis:</p> */}
      {/* <select name="x" onChange={e => changeStyle(e, 'x')}>
        <option />
        {Object.keys(graphData[0]).map((key, i) => {
          if (graphSelected === 'bar') {
            return filterColumn(graphData, 'string', key, i)
          } else if (graphSelected === 'scatter') {
            return filterColumn(graphData, 'number', key, i)
          } else {
            return (
              <option key={i} value={key}>
                {key}
              </option>
            )
          }
        })}
      </select> */}
      <SimpleSelect
        items={filterColumn(graphData, 'number')}
        name={graphSelected === 'pie' ? "Values" : "Left Axis"}
        changeStyle={changeStyle}
        column="y"
        message="Choose a column"
      />

      <SimpleSelect
        items={
          graphSelected === 'scatter'
            ? filterColumn(graphData, 'number')
            : graphSelected === 'bar'
              ? filterColumn(graphData, 'string')
              : Object.keys(graphData[0])
        }
        changeStyle={changeStyle}
        name={graphSelected === 'pie' ? "Labels" : "Bottom Axis"}
        column="x"
      />
      <p>Color:</p>
      {graphSelected === 'pie' ? <PieColorOptions {...props} /> :
        <select name="color" onChange={e => changeStyle(e, 'color')}>
          <option value="tomato">Tomato</option>
          <option value="gold">Gold</option>
          <option value="orange">Orange</option>
          <option value="#f77">Salmon</option>
          <option value="#55e">Purple</option>
          <option value="#8af">Periwinkle</option>
        </select>}
      {graphSelected === 'line' ? (
        ''
      ) : (
          <div>
            <p>Highlight:</p>
            <select name="highlight" onChange={e => changeStyle(e, 'highlight')}>
              <option value="orange">Orange</option>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>
          </div>
        )}

      <p>Pointer:</p>
      <select name="tooltip" onChange={e => changeStyle(e, 'tooltip')}>
        <option value={5}>Round edge</option>
        <option value={0}>Square</option>
        <option value={25}>Circle</option>
      </select>

      <p>Graph Title:</p>
      <input value={props.title} onChange={e => changeStyle(e, 'title')} />
      {graphSelected === 'scatter' ? (
        <p>
          Regression Line:{' '}
          <input
            type="checkbox"
            onChange={e => {
              changeStyle(!props.regression, 'regression')
              // console.log('x and y on state', props.x, props.y)
              if (!props.regression) {
                buildRegressionModel(
                  graphData,
                  props.x,
                  props.y,
                  props.changeStyle
                )
              } else {
                changeStyle([], 'regressionLine')
              }
            }}
          />
        </p>
      ) : (
          ''
        )}
    </div>
  )
}
