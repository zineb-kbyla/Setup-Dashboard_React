import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({page , handleChangePage , rowsPerPage , handleChangeRowsPerPage , count}) {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[]} 
    />
  );
}