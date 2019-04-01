import React, { memo } from 'react'
import styled, { withTheme } from 'styled-components/macro'
import Particles from 'react-particles-js'

const getParams = (color: string) => ({
  particles: {
    number: {
      value: Math.max(window.outerWidth / 2, window.outerHeight / 2),
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: color,
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 0.2,
        opacity_min: 0.05,
        sync: false,
      },
    },
    size: {
      value: 2,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: window.outerWidth * window.outerHeight / 8000000,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 1400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 83.91608391608392,
        size: 1,
        duration: 3,
        opacity: 1,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
}) as any

const Stars = styled(Particles)`
  position: absolute;
  top: -65px;
  left: 0;
  height: 100vh;
  width: 100%;
`

interface StarsProps {
  theme: any
}

export default withTheme(memo(({ theme, ...props }: StarsProps) => (
  <Stars params={getParams(theme.login.particlesColor)} {...props} />
)))
