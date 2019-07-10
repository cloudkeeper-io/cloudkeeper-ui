/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import styled from 'styled-components/macro'
import times from 'lodash/times'
import { storiesOf } from '@storybook/react'

import Input from '../components/form/input.component'
import IconInput from '../components/form/icon-input.component'
import Checkbox from '../components/controls/checkbox.component'
import RadioButton from '../components/controls/radio.component'
import Switch from '../components/controls/switch.component'

const Wrapper = styled.div`
  width: 300px;
`
const CheckboxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.div`
  margin: 20px;
  height: 20px;
`

storiesOf('Input', module)
  .add('Simple Inputs', () => (
    <Wrapper>
      <Input defaultValue="Value" />
      <Input placeholder="Placeholder" />
    </Wrapper>
  ))
  .add('Icons Inputs', () => (
    <Wrapper>
      <IconInput icon="mail" placeholder="Email" />
      <IconInput icon="lock" placeholder="Password" />
    </Wrapper>
  ))
  .add('Checkboxes / Radiobuttons ', () => (
    <CheckboxesWrapper>
      <Wrapper>
        {times(3, () => (
          <Item>
            <Checkbox />
          </Item>
        ))}
      </Wrapper>
      <Wrapper>
        {times(3, () => (
          <Item>
            <RadioButton name="test" />
          </Item>
        ))}
      </Wrapper>
      <Wrapper>
        {times(3, () => (
          <Item>
            <Switch />
          </Item>
        ))}
      </Wrapper>
    </CheckboxesWrapper>
  ))
