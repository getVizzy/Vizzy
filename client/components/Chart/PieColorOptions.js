import React, { Component } from 'react'



const PieColorOptions = props => {
  let { changeStyle } = props

  let colorThemes = {
    forest: ["#8c510a", "#d8b365", "#f6e8c3", "#c7eae5", "#5ab4ac", "#01665e"],
    sweet: ["#c51b7d", "#e9a3c9", "#fde0ef", "#e6f5d0", "#a1d76a", "#4d9221"],
    orchid: ["#762a83", "#af8dc3", "#e7d4e8", "#d9f0d3", "#7fbf7b", "#1b7837"],
    sunshine: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
  }
  return (
    <select name="pieColor" onChange={e => changeStyle(e, 'pieColor')}>
      <option value={colorThemes.sunshine}>Sunshine</option>
      <option value={colorThemes.forest}>Forest</option>
      <option value={colorThemes.sweet}>Sweet</option>
      <option value={colorThemes.orchid}>Orchid</option>
    </select>
  )

}

export default PieColorOptions
