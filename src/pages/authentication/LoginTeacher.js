import { Link } from 'react-router-dom';
import { useEffect } from 'react';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLoginTeacher';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN_TEACHER ||================================ //

const LoginTeacher = () => {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('school_data');
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng Nhập</Typography>
            <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Dành cho sinh viên?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default LoginTeacher;
