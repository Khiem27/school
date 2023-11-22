import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Modal,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';

import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

const DashboardQlsv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    tenSinhVien: '',
    maSinhVien: '',
    diaChi: '',
    maLop: ''
  });

  const [classList, setClassList] = useState([]);
  const [searchedClass, setSearchedClass] = useState('');

  const [students, setStudents] = useState([]);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  let navigate = useNavigate();

  const handleSearchClassChange = (e) => {
    setSearchedClass(e.target.value);
  };

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:8081/classes/');
      if (response.ok) {
        const data = await response.json();
        setClassList(data);
      } else {
        console.error('Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    checkToken();
    fetchStudents();
    fetchClasses();
  }, []);

  const handleAddStudentClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = (studentId) => {
    const studentToEdit = students.find((student) => student.maSinhVien === studentId);
    setNewStudent({
      tenSinhVien: studentToEdit.tenSinhVien,
      maSinhVien: studentToEdit.maSinhVien,
      diaChi: studentToEdit.diaChi,
      maLop: studentToEdit.maLop
    });
    console.log(studentToEdit, 'studentToEdit');
    setIsEditing(true);
    setEditingStudentId(studentToEdit.id);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewStudent({
      tenSinhVien: '',
      maSinhVien: '',
      diaChi: '',
      maLop: ''
    });
    setError(null);
    setIsEditing(false);
    setEditingStudentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value
    }));
  };

  const handleAddStudent = async () => {
    setIsAddingStudent(true);

    try {
      const response = await fetch('http://localhost:8081/students/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (response.ok) {
        console.log('Student added successfully');
        fetchStudents();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setError('An error occurred while adding the student');
    } finally {
      setIsAddingStudent(false);
      if (!error) {
        handleModalClose();
      }
    }
  };

  const handleUpdateStudent = async () => {
    setIsAddingStudent(true);

    try {
      const response = await fetch(`http://localhost:8081/students/${editingStudentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newStudent)
      });

      if (response.ok) {
        console.log('Student updated successfully');
        fetchStudents();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setError('An error occurred while updating the student');
    } finally {
      setIsAddingStudent(false);
      if (!error) {
        handleModalClose();
      }
    }
  };

  const checkToken = async () => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate('/login');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8081/students/');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Danh sách sinh viên</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleAddStudentClick}>
              Thêm sinh viên
            </Button>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Sinh Viên</TableCell>
                  <TableCell>Mã Sinh Viên</TableCell>
                  <TableCell>Mã Lớp</TableCell>
                  <TableCell>Tên Lớp</TableCell>
                  <TableCell>Địa Chỉ Sinh Viên</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.maSinhVien}>
                    <TableCell>{student.tenSinhVien}</TableCell>
                    <TableCell>{student.maSinhVien}</TableCell>
                    <TableCell>{student.lop.maLop}</TableCell>
                    <TableCell>{student.lop ? student.lop.tenLop : ''}</TableCell>
                    <TableCell>{student.diaChi}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleEditClick(student.maSinhVien)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      <Modal open={isModalOpen} onClose={handleModalClose}>
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
          <Typography variant="h5" component="div">
            {isEditing ? 'Sửa thông tin sinh viên' : 'Thêm sinh viên'}
          </Typography>
          <TextField
            label="Tên Sinh Viên"
            variant="outlined"
            fullWidth
            name="tenSinhVien"
            value={newStudent.tenSinhVien}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Mã Sinh Viên"
            variant="outlined"
            fullWidth
            name="maSinhVien"
            value={newStudent.maSinhVien}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            label="Mã Lớp"
            variant="outlined"
            fullWidth
            name="maLop"
            value={newStudent.maLop}
            onChange={(e) => {
              handleInputChange(e);
              handleSearchClassChange(e);
            }}
            margin="normal"
            select
          >
            <MenuItem value="" disabled>
              Chọn Mã Lớp
            </MenuItem>
            {classList
              .filter((classItem) => classItem.maLop.includes(searchedClass))
              .map((classItem) => (
                <MenuItem key={classItem.id} value={classItem.maLop}>
                  {classItem.tenLop}
                </MenuItem>
              ))}
          </TextField>

          <TextField
            label="Địa Chỉ Sinh Viên"
            variant="outlined"
            fullWidth
            name="diaChi"
            value={newStudent.diaChi}
            onChange={handleInputChange}
            margin="normal"
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {isEditing && (
              <Button
                onClick={() => {
                  handleModalClose();
                  setIsEditing(false);
                }}
                disabled={isAddingStudent}
                style={{ marginRight: '10px' }}
              >
                Cancel
              </Button>
            )}
            <Button
              onClick={isEditing ? handleUpdateStudent : handleAddStudent}
              variant="contained"
              color="primary"
              disabled={isAddingStudent}
            >
              {isAddingStudent ? 'Adding...' : isEditing ? 'Update' : 'Thêm'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default DashboardQlsv;
