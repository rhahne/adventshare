import React, { Component } from 'react'
import { Hero, Container, Section, Heading } from 'react-bulma-components'

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <Section>
          <Hero color="primary">
            <Hero.Body>
              <Container>
                <Heading>Hero title Primary</Heading>
                <Heading subtitle size={3}>
                  Subtitle
                </Heading>
              </Container>
            </Hero.Body>
          </Hero>
        </Section>
      </div>
    )
  }
}
