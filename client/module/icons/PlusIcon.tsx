/* eslint-disable no-restricted-syntax */
import React from 'react';

interface PlusIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({
  width = 10,
  height = 10,
  fill = 'currentColor',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 12 12"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.00006 1V11"
      stroke="#121D22"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 5.99951H11"
      stroke="#121D22"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default PlusIcon;
