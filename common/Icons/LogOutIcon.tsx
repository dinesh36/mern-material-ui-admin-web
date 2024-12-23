/* eslint-disable no-restricted-syntax */
import React from 'react';

interface LogOutIconProps {
  width?: number;
  height?: number;
  fill?: string;
  sx?: { mr: number };
}

const LogOutIcon: React.FC<LogOutIconProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
      stroke="#121D22"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 17L21 12L16 7"
      stroke="#121D22"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21 12H9"
      stroke="#121D22"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default LogOutIcon;
