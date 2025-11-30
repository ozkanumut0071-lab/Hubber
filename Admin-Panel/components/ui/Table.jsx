import React from 'react';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export const Table = ({ children, className = '' }) => (
  <table className={cx('table', className)}>{children}</table>
);

export const TableHeader = ({ children, className = '' }) => (
  <thead className={cx('table__header', className)}>{children}</thead>
);

export const TableBody = ({ children, className = '' }) => (
  <tbody className={cx('table__body', className)}>{children}</tbody>
);

export const TableRow = ({ children, className = '' }) => (
  <tr className={cx('table__row', className)}>{children}</tr>
);

export const TableHead = ({ children, className = '' }) => (
  <th scope="col" className={cx('table__head', className)}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={cx('table__cell', className)}>{children}</td>
);

export default {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
};
