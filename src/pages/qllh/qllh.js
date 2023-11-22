import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Modal,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import MainCard from 'components/MainCard';

const tableHeaders = [
  { id: 'tenLop', align: 'left', disablePadding: false, label: 'Tên Lớp' },
  { id: 'maLop', align: 'left', disablePadding: false, label: 'Mã Lớp' },
  { id: 'nienKhoa', align: 'left', disablePadding: false, label: 'Niên Khóa' },
  { id: 'actions', align: 'left', disablePadding: false, label: 'Actions' }
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((header) => (
          <TableCell key={header.id} align={header.align} padding={header.disablePadding ? 'none' : 'normal'}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const DashboardQllh = () => {
  const [classes, setClasses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClass, setNewClass] = useState({ tenLop: '', maLop: '', nienKhoa: '' });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/classes/');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewClass({ tenLop: '', maLop: '', nienKhoa: '' });
  };

  const openEditModal = (classData) => {
    setEditedClass(classData);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditedClass((prevClass) => ({
        ...prevClass,
        [name]: value
      }));
    } else {
      setNewClass((prevClass) => ({
        ...prevClass,
        [name]: value
      }));
    }
  };

  const addClass = async () => {
    try {
      const response = await fetch('http://localhost:8081/classes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass)
      });

      if (response.ok) {
        const data = await response.json();
        setClasses([...classes, data]);
        closeAddModal();
      } else {
        console.error('Failed to add class');
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Danh sách lớp học</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Thêm Lớp Học
          </Button>
        </Grid>
      </Grid>

      <MainCard sx={{ mt: 2 }} content={false}>
        <TableContainer>
          <Table>
            <EnhancedTableHead />
            <TableBody>
              {classes.map((classData) => (
                <TableRow key={classData.id}>
                  <TableCell align="left">{classData.tenLop}</TableCell>
                  <TableCell align="left">{classData.maLop}</TableCell>
                  <TableCell align="left">{classData.nienKhoa}</TableCell>
                  <TableCell align="left" style={{ width: '50px' }}>
                    <Button variant="outlined" color="secondary" style={{ fontSize: '0.8rem' }} onClick={() => openEditModal(classData)}>
                      Sửa
                    </Button>
                  </TableCell>
                  <TableCell align="left" style={{ width: '50px' }}>
                    <Button variant="outlined" color="error" style={{ fontSize: '0.8rem' }} onClick={() => deleteClass(classData.id)}>
                      Xoá
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Modal to add a new class */}
      <Modal open={isAddModalOpen} onClose={closeAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography variant="h6" component="div">
            Thêm Lớp Học
          </Typography>
          <TextField
            label="Tên Lớp"
            variant="outlined"
            fullWidth
            name="tenLop"
            value={newClass.tenLop}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <TextField
            label="Mã Lớp"
            variant="outlined"
            fullWidth
            name="maLop"
            value={newClass.maLop}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <TextField
            label="Niên Khóa"
            variant="outlined"
            fullWidth
            name="nienKhoa"
            value={newClass.nienKhoa}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={addClass} variant="contained" color="primary">
              Thêm Lớp Học
            </Button>
            <Button onClick={closeAddModal} style={{ marginLeft: '10px' }}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardQllh;
