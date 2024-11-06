

import React from 'react';
import "./style.css";
import { filterIcon } from './../../assets/svgIcons/index';
import cx from "classnames"
const CustomButton = ({ onClick , color, className , text , icon , bgColor }) => {
  return (
    <div className={cx('custom_button'  , className )}
      onClick={onClick}
      style={{
        background: bgColor || "#4e73df" ,
        bordercolor: bgColor || "#4e73df",
        border:`1px solid ${'#4e73df' }`
      }}
    >
      <span style={{
            background: 'rgba(0, 0, 0, 0.15)',
            display: 'inline-block',
            padding: '0.375rem 0.75rem',
      }} className='icon'>{icon || filterIcon}</span>
      <span style={{
        color: color || "#fff"
      }} className='text'>{text || 'filter'}</span>
        
    </div>
  )
}

export default CustomButton
