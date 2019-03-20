import React, { Component } from 'react'

import {
  Field,
  Control,
  Label,
  Select,
} from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';

export default class Search extends Component {
  
  render() {
    const { email, name, password, comment, gender, question, termsAccepted } = this.state;
    return (
      <div>
        <Field>
              <Label>Gender</Label>
              <Control>
                <Select onChange={this.onChange} name="gender" value={gender}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other?</option>
                </Select>
              </Control>
            </Field>
      </div>
    )
  }
}

