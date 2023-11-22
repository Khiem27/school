import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableRow, Button, TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

// Tạo dữ liệu mẫu với các trường mới
function createData(masv, tensv, dcsv, malp) {
  return { masv, tensv, dcsv, malp };
}

const initialRows = [
  createData('SV001', 'Nguyễn Văn A', '123 Đường ABC, Quận 1, TP.HCM', 'L01'),
  createData('SV002', 'Trần Thị B', '456 Đường XYZ, Quận 2, TP.HCM', 'L02'),
  createData('SV003', 'Lê Văn C', '789 Đường LMN, Quận 3, TP.HCM', 'L03'),
  createData('SV004', 'Phạm Thị D', '101 Đường DEF, Quận 4, TP.HCM', 'L04'),
  createData('SV005', 'Hoàng Văn E', '202 Đường GHI, Quận 5, TP.HCM', 'L05'),
  createData('SV006', 'Mai Thị F', '303 Đường KLM, Quận 6, TP.HCM', 'L06'),
  createData('SV007', 'Vũ Văn G', '404 Đường NOP, Quận 7, TP.HCM', 'L07'),
  createData('SV008', 'Lý Thị H', '505 Đường QRS, Quận 8, TP.HCM', 'L08'),
  createData('SV009', 'Đỗ Văn I', '606 Đường UVW, Quận 9, TP.HCM', 'L09'),
  createData('SV010', 'Ngô Thị K', '707 Đường XYZ, Quận 10, TP.HCM', 'L10')
];

const headCells = [
  {
    id: 'masv',
    align: 'left',
    disablePadding: false,
    label: 'Mã Sinh Viên'
  },
  {
    id: 'tensv',
    align: 'left',
    disablePadding: true,
    label: 'Tên Sinh Viên'
  },
  {
    id: 'dcsv',
    align: 'left',
    disablePadding: false,
    label: 'Địa Chỉ Sinh Viên'
  },
  {
    id: 'malp',
    align: 'left',
    disablePadding: false,
    label: 'Mã Lớp'
  }
];

function EnhancedTableHead({ onFilterChange }) {
  const handleFilterChange = (field, value) => {
    onFilterChange(field, value);
  };

  return (
    <>
      {/* Hàng filter */}
      <TableRow>
        <TableCell>
          <TextField
            label="Lọc theo Mã Sinh Viên"
            variant="standard"
            size="small"
            onChange={(e) => handleFilterChange('masv', e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Lọc theo Tên Sinh Viên"
            variant="standard"
            size="small"
            onChange={(e) => handleFilterChange('tensv', e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            label="Lọc theo Địa Chỉ Sinh Viên"
            variant="standard"
            size="small"
            onChange={(e) => handleFilterChange('dcsv', e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField label="Lọc theo Mã Lớp" variant="standard" size="small" onChange={(e) => handleFilterChange('malp', e.target.value)} />
        </TableCell>
      </TableRow>
      {/* Hàng thông tin */}
      <TableRow>
        {/* Các ô thông tin */}
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

function OrderTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('masv');
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState({
    masv: '',
    tensv: '',
    dcsv: '',
    malp: ''
  });

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (field, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value
    }));
  };

  const isSelected = (masv) => selected.indexOf(masv) !== -1;

  const deleteStudent = (masv) => {
    const updatedRows = rows.filter((student) => student.masv !== masv);
    setRows(updatedRows);
    setSelected([]);
  };

  // Lọc dữ liệu theo giá trị filter
  const filteredRows = rows.filter((row) => {
    return (
      row.masv.toLowerCase().includes(filter.masv.toLowerCase()) &&
      row.tensv.toLowerCase().includes(filter.tensv.toLowerCase()) &&
      row.dcsv.toLowerCase().includes(filter.dcsv.toLowerCase()) &&
      row.malp.toLowerCase().includes(filter.malp.toLowerCase())
    );
  });

  return (
    <Box>
      <TableContainer>
        <Table>
          <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} onFilterChange={handleFilterChange} />
          <TableBody>
            {filteredRows.map((row) => {
              const isItemSelected = isSelected(row.masv);

              return (
                <TableRow hover role="checkbox" selected={isItemSelected} key={row.masv}>
                  <TableCell align="left">
                    <Link color="secondary" component={RouterLink} to={`/${row.masv}`}>
                      {row.masv}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.tensv}</TableCell>
                  <TableCell align="left">{row.dcsv}</TableCell>
                  <TableCell align="left">{row.malp}</TableCell>
                  {/* Các ô còn lại */}
                  <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                  <TableCell align="right" style={{ width: '50px' }}>
                    <Button variant="outlined" color="secondary" style={{ fontSize: '0.8rem' }}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right" style={{ width: '50px' }}>
                    <Button variant="outlined" color="error" style={{ fontSize: '0.8rem' }} onClick={() => deleteStudent(row.masv)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default OrderTable;
