import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LandingContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`
const LandingButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`
const LandingButton = styled.button`
  cursor: pointer;
  background: #fff;
  display: block;
  position: relative;
  width: 20em;
  height: 5em;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  
  span {
    font-size: 1.8em;
  }
`
const Logo: React.FC = () => {
  return (
    <svg width="416" height="144" viewBox="0 0 416 144" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.560156 1.99999V142H28.5602V97H34.9602C59.7602 97 71.7602 85 71.7602 51V50.6C71.7602 17.4 58.7602 1.99999 35.1602 1.99999H0.560156ZM28.5602 26.4H34.9602C41.3602 26.4 43.7602 29.8 43.7602 38.6V61.2C43.7602 69.4 41.3602 72.8 34.9602 72.8H28.5602V26.4ZM76.9227 36.4V107.4C76.9227 132 90.9227 144 112.723 144C134.923 144 149.323 131.8 149.323 107.4V36.4C149.323 12.2 134.923 -7.62939e-06 112.723 -7.62939e-06C90.9227 -7.62939e-06 76.9227 11.8 76.9227 36.4ZM104.923 34.6C104.923 26.8 108.923 24.4 113.123 24.4C117.523 24.4 121.323 26.8 121.323 34.6V109.4C121.323 117 117.523 119.8 113.123 119.8C108.923 119.8 104.923 117 104.923 109.4V34.6ZM156.034 1.79999V142H207.034V117.6H184.034V1.79999H156.034ZM211.502 1.79999V142H262.502V117.6H239.502V1.79999H211.502ZM265.595 1.99999V107.4C265.595 132 279.195 144 300.995 144C322.995 144 336.995 131.8 336.995 107.4V1.99999H308.995V109.4C308.995 117 305.395 119.8 301.395 119.8C297.395 119.8 293.595 117 293.595 109.4V1.99999H265.595ZM415.529 51.6V36.6C415.529 13.4 402.129 -7.62939e-06 379.129 -7.62939e-06C356.529 -7.62939e-06 343.729 13 343.729 36.6V39C343.729 60.8 348.529 70.8 363.529 77.8L371.129 81.2C385.529 88.2 387.729 91 387.729 99.4V109.6C387.729 116 384.729 119.6 379.529 119.6C374.329 119.6 371.329 116 371.329 109.4V92.4H343.329V107.2C343.329 131 356.129 144 379.129 144C402.329 144 415.929 130.6 415.929 107.2V104C415.929 82.2 410.929 72.6 396.129 65.8L389.329 62.8C373.729 55.4 371.729 52.4 371.729 44V34.6C371.729 28 374.529 24.4 379.529 24.4C384.529 24.4 387.529 28 387.529 34.6V51.6H415.529Z" fill="url(#paint0_diamond_10_3)"/>
      <defs>
      <radialGradient id="paint0_diamond_10_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(208 75) rotate(90) scale(375.5 1262.23)">
      <stop stop-color="#D67575"/>
      <stop offset="1" stop-color="white" stop-opacity="0.74"/>
      </radialGradient>
      </defs>
    </svg>
  )
}

const LandingButtons: React.FC = () => {
  const navigate = useNavigate()

  return (
    <LandingButtonsContainer>
      <LandingButton><span>🏗️ Build</span></LandingButton>
      <LandingButton><span>🛠️ Edit</span></LandingButton>
      <LandingButton onClick={() => navigate('/build')}><span>🏗️ Build</span></LandingButton>
      <LandingButton onClick={() => navigate('/edit')}><span>🛠️ Edit</span></LandingButton>
    </LandingButtonsContainer>
  )
}
const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <Logo />
      <LandingButtons />
    </LandingContainer>
  )
}
export default Landing
