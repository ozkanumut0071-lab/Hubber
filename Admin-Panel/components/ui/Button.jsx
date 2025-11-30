import React from 'react';

/**
 * Button Component (Radix-style)
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button içeriği
 * @param {string} props.variant - 'primary', 'secondary', 'outline', 'danger'
 * @param {string} props.size - 'sm', 'md', 'lg'
 * @param {boolean} props.disabled
 * @param {Function} props.onClick
 * @param {string} props.className - Ek CSS sınıfı
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'is-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
