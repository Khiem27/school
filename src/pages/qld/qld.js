import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Box
} from '@mui/material';

import MainCard from 'components/MainCard';

const DashboardQld = () => {
  const [points, setPoints] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPoint, setNewPoint] = useState({
    maMonHoc: null,
    maSinhVien: null,
    diem: 0
  });
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [editPointId, setEditPointId] = useState(null);

  const fetchPoints = async () => {
    try {
      const response = await fetch('http://localhost:8081/points/');
      if (response.ok) {
        const data = await response.json();
        setPoints(data);
      } else {
        console.error('Failed to fetch points');
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:8081/subjects/');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        console.error('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPointId(null);
  };

  const handleOpenEdit = (pointId) => {
    setEditPointId(pointId);
    setOpen(true);
  };

  const handleInputChange = (e, value, field) => {
    if (editPointId) {
      // Nếu đang ở chế độ chỉnh sửa, cập nhật trực tiếp giá trị của điểm hiện tại
      setPoints((prevPoints) => prevPoints.map((point) => (point.id === editPointId ? { ...point, [field]: value } : point)));
    } else {
      // Ngược lại, cập nhật giá trị của newPoint
      setNewPoint((prev) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/points/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          maMonHoc: newPoint.maMonHoc,
          maSinhVien: newPoint.maSinhVien,
          diem: newPoint.diem
        })
      });
      if (response.ok) {
        handleClose();
        fetchPoints(); // Refetch points after adding a new one
      } else {
        console.error('Failed to add point');
      }
    } catch (error) {
      console.error('Error adding point:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const currentPoint = points.find((point) => point.id === editPointId);
      const response = await fetch(`http://localhost:8081/points/${editPointId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          diem: currentPoint ? currentPoint.diem : 0
        })
      });
      if (response.ok) {
        handleClose();
        fetchPoints(); // Refetch points after editing
      } else {
        console.error('Failed to edit point');
      }
    } catch (error) {
      console.error('Error editing point:', error);
    }
  };

  useEffect(() => {
    fetchPoints();
    fetchSubjects();
    fetchStudents();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Danh sách điểm</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Thêm Điểm
            </Button>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TableContainer component={Paper} sx={{ bgcolor: 'white' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên Sinh Viên</TableCell>
                  <TableCell>Mã Sinh Viên</TableCell>
                  <TableCell>Địa Chỉ Sinh Viên</TableCell>
                  <TableCell>Tên Môn Học</TableCell>
                  <TableCell>Mã Môn Học</TableCell>
                  <TableCell>Số Tín Chỉ</TableCell>
                  <TableCell>Điểm</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {points.map((point) => (
                  <TableRow key={point.id}>
                    <TableCell>{point.id}</TableCell>
                    <TableCell>{point.sinhVien.tenSinhVien}</TableCell>
                    <TableCell>{point.sinhVien.maSinhVien}</TableCell>
                    <TableCell>{point.sinhVien.diaChi}</TableCell>
                    <TableCell>{point.monHoc.tenMonHoc}</TableCell>
                    <TableCell>{point.monHoc.maMonHoc}</TableCell>
                    <TableCell>{point.monHoc.soTinChi}</TableCell>
                    <TableCell>{point.diem}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleOpenEdit(point.id)}>
                        Sửa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>

      {/* Modal for adding/editing a point */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editPointId ? 'Sửa Điểm' : 'Thêm Điểm'}</DialogTitle>
        <DialogContent>
          {!editPointId ? (
            <Box sx={{ minWidth: 300 }}>
              <Autocomplete
                options={subjects}
                getOptionLabel={(option) => option.maMonHoc}
                renderInput={(params) => <TextField {...params} label="Mã Môn Học" />}
                onChange={(e, value) => handleInputChange(e, value, 'maMonHoc')}
                value={
                  editPointId
                    ? subjects.find((subject) => subject.maMonHoc === points.find((point) => point.id === editPointId)?.monHoc.maMonHoc)
                    : newPoint.maMonHoc
                }
              />
            </Box>
          ) : null}
          {!editPointId ? (
            <Box sx={{ mt: 2, minWidth: 300 }}>
              <Autocomplete
                options={students}
                getOptionLabel={(option) => option.maSinhVien}
                renderInput={(params) => <TextField {...params} label="Mã Sinh Viên" />}
                onChange={(e, value) => handleInputChange(e, value, 'maSinhVien')}
                value={
                  editPointId
                    ? students.find(
                        (student) => student.maSinhVien === points.find((point) => point.id === editPointId)?.sinhVien.maSinhVien
                      )
                    : newPoint.maSinhVien
                }
              />
            </Box>
          ) : null}
          <TextField
            label="Điểm"
            name="diem"
            type="number"
            value={editPointId ? points.find((point) => point.id === editPointId)?.diem : newPoint.diem}
            onChange={(e) => handleInputChange(e, e.target.value, 'diem')}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={editPointId ? handleEditSubmit : handleSubmit} color="primary">
            {editPointId ? 'Lưu' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default DashboardQld;
