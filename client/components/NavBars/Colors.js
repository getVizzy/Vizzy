import React, { Component } from 'react';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';
import amber from '@material-ui/core/colors/amber';
import indigo from '@material-ui/core/colors/indigo';


let colors = [
  lightGreen,
  lime,
  teal,
  yellow,
  amber,
  indigo
]

// export const AvatarColors = props => {
//   let randomColor = colors[Math.floor(Math.random() * colors.length)]
//   return (
//     randomColor
//   )
// }

export const AvatarColors = props => {
  let randomColor = colors[Math.floor(Math.random() * colors.length)]
  console.log('HERE', randomColor)
  return (
    randomColor
  )
}
