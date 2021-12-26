import React, { Component } from 'react';

export const Button = ({ className = '', icon = 'play_arrow', children, ...props }) => (
    <button className={`btn--play ${className}`} {...props}>
      {children
        ? children
        : <i className={`fa fa-${icon}`} />
      }
    </button>
)
