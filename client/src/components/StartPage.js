import React, { Component } from 'react'
import { Section, Hero, Heading, Container } from "react-bulma-components/full";

export default class StartPage extends Component {
  render() {
    return (
      <div>
        <Section>
          <Hero>
            <Hero.Body>
              <Container>
                <Heading size={1}>Adventshare</Heading>
                <Heading subtitle size={4}>
                  Find an apartment together and go adventsharing!
              </Heading>
              </Container>
            </Hero.Body>
          </Hero>
        </Section>
      </div>
    )
  }
}
