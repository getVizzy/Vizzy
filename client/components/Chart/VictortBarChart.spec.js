import React from 'react'
import {shallow} from 'enzyme'

import VictoryBarChart from './VictoryBarChart'

const props = {
  data: [{x: 'a', y: 2}, {x: 'b', y: 2}, {x: 'c', y: 2}]
}

describe('VictoryBarChart', () => {
  it('does something', () => {
    const wrapper = shallow(<VictoryBarChart />)
  })
})
