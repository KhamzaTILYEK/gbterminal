import React from 'react'
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg'

export const RU = props => (
  <Svg height={480} width={640} viewBox="0 0 640 480" {...props}>
    <G fillRule="evenodd" strokeWidth="1pt">
      <Path fill="#fff" d="M0 0h640v480H0z" />
      <Path fill="#0039a6" d="M0 160.003h640V480H0z" />
      <Path fill="#d52b1e" d="M0 319.997h640V480H0z" />
    </G>
  </Svg>
)


export const EN = props => (
  <Svg height={480} width={640} viewBox="0 0 640 480" {...props}>
    <Defs>
      <ClipPath id="a">
        <Path fillOpacity={0.67} d="M-85.333 0h682.67v512h-682.67z" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#a)" transform="translate(80) scale(.94)">
      <G strokeWidth="1pt">
        <Path fill="#006" d="M-256 0H768.02v512.01H-256z" />
        <Path
          d="M-256 0v57.244l909.535 454.768H768.02V454.77L-141.515 0H-256zM768.02 0v57.243L-141.515 512.01H-256v-57.243L653.535 0H768.02z"
          fill="#fff"
        />
        <Path
          d="M170.675 0v512.01h170.67V0h-170.67zM-256 170.67v170.67H768.02V170.67H-256z"
          fill="#fff"
        />
        <Path
          d="M-256 204.804v102.402H768.02V204.804H-256zM204.81 0v512.01h102.4V0h-102.4zM-256 512.01L85.34 341.34h76.324l-341.34 170.67H-256zM-256 0L85.34 170.67H9.016L-256 38.164V0zm606.356 170.67L691.696 0h76.324L426.68 170.67h-76.324zM768.02 512.01L426.68 341.34h76.324L768.02 473.848v38.162z"
          fill="#c00"
        />
      </G>
    </G>
  </Svg>
)