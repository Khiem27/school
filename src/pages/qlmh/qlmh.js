import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Modal, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainCard from 'components/MainCard';

const initialSubjects = [{ id: 1, tenMonHoc: 'CNTT', maMonHoc: 'cntt', soTinChi: 3 }];

const tableHeaders = [
  { id: 'tenMonHoc', align: 'left', disablePadding: false, label: 'Tên Môn Học' },
  { id: 'maMonHoc', align: 'left', disablePadding: false, label: 'Mã Môn Học' },
  { id: 'soTinChi', align: 'left', disablePadding: false, label: 'Số Tín Chỉ' },
  { id: 'actions', align: 'left', disablePadding: false, label: 'Actions' }
];

function TableHeader() {
  return (
    <TableRow>
      {tableHeaders.map((header) => (
        <TableCell key={header.id} align={header.align} padding={header.disablePadding ? 'none' : 'normal'}>
          {header.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const DashboardQlmh = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState({ tenMonHoc: '', maMonHoc: '', soTinChi: '' });
  const [editedSubject, setEditedSubject] = useState({ id: '', tenMonHoc: '', maMonHoc: '', soTinChi: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/subjects/');
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchData();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewSubject({ tenMonHoc: '', maMonHoc: '', soTinChi: '' });
  };

  const openEditModal = (subject) => {
    setEditedSubject(subject);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedSubject({ id: '', tenMonHoc: '', maMonHoc: '', soTinChi: '' });
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditedSubject((prevSubject) => ({
        ...prevSubject,
        [name]: value
      }));
    } else {
      setNewSubject((prevSubject) => ({
        ...prevSubject,
        [name]: value
      }));
    }
  };

  const addSubject = async () => {
    try {
      const response = await fetch('http://localhost:8081/subjects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenmonhoc: newSubject.tenMonHoc,
          mamonhoc: newSubject.maMonHoc,
          sotinchi: newSubject.soTinChi
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects([...subjects, data]);
        closeAddModal();
      } else {
        console.error('Failed to add subject');
      }
    } catch (error) {
      console.error('Error adding subject:', error);
    }
  };

  const updateSubject = async () => {
    try {
      const response = await fetch(`http://localhost:8081/subjects/${editedSubject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenmonhoc: editedSubject.tenMonHoc,
          mamonhoc: editedSubject.maMonHoc,
          sotinchi: editedSubject.soTinChi
        })
      });

      if (response.ok) {
        const updatedSubject = await response.json();

        // Cập nhật môn học trong danh sách
        setSubjects((prevSubjects) => prevSubjects.map((subject) => (subject.id === editedSubject.id ? updatedSubject : subject)));

        closeEditModal();
      } else {
        console.error('Failed to update subject');
      }
    } catch (error) {
      console.error('Error updating subject:', error);
    }
  };

  return (
    <Box>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Danh sách môn học</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={openAddModal}>
            Thêm Môn Học
          </Button>
        </Grid>
      </Grid>

      <MainCard sx={{ mt: 2 }} content={false}>
        <TableContainer>
          <Table>
            <TableHeader />
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell align="left">
                    <RouterLink color="secondary" to={`/mon-hoc/${subject.id}`}>
                      {subject.tenMonHoc}
                    </RouterLink>
                  </TableCell>
                  <TableCell align="left">{subject.maMonHoc}</TableCell>
                  <TableCell align="left">{subject.soTinChi}</TableCell>
                  <TableCell align="left" style={{ width: '50px' }}>
                    <Button variant="outlined" color="secondary" style={{ fontSize: '0.8rem' }} onClick={() => openEditModal(subject)}>
                      Sửa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      {/* Modal to add a new subject */}
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
            Thêm Môn Học
          </Typography>
          <TextField
            label="Tên Môn Học"
            variant="outlined"
            fullWidth
            name="tenMonHoc"
            value={newSubject.tenMonHoc}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <TextField
            label="Mã Môn Học"
            variant="outlined"
            fullWidth
            name="maMonHoc"
            value={newSubject.maMonHoc}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <TextField
            label="Số Tín Chỉ"
            variant="outlined"
            fullWidth
            name="soTinChi"
            value={newSubject.soTinChi}
            onChange={(e) => handleInputChange(e)}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={addSubject} variant="contained" color="primary">
              Thêm Môn Học
            </Button>
            <Button onClick={closeAddModal} style={{ marginLeft: '10px' }}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal to edit subject information */}
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
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
            Sửa Thông Tin Môn Học
          </Typography>
          <TextField
            label="Tên Môn Học"
            variant="outlined"
            fullWidth
            name="tenMonHoc"
            value={editedSubject.tenMonHoc}
            onChange={(e) => handleInputChange(e, true)}
            margin="normal"
          />
          <TextField
            label="Mã Môn Học"
            variant="outlined"
            fullWidth
            name="maMonHoc"
            value={editedSubject.maMonHoc}
            onChange={(e) => handleInputChange(e, true)}
            margin="normal"
          />
          <TextField
            label="Số Tín Chỉ"
            variant="outlined"
            fullWidth
            name="soTinChi"
            value={editedSubject.soTinChi}
            onChange={(e) => handleInputChange(e, true)}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={updateSubject} variant="contained" color="primary">
              Cập Nhật Môn Học
            </Button>
            <Button onClick={closeEditModal} style={{ marginLeft: '10px' }}>
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardQlmh;
