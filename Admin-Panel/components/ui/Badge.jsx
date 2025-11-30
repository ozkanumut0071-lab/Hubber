import React from 'react';

/**
 * Badge Component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} props.variant - 'default', 'success', 'warning', 'danger'
 * @param {string} props.className
 */
const Badge = ({ children, variant = 'default', className = '' }) => {
  const classes = ['badge', `badge--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{children}</span>;
};

export default Badge;
