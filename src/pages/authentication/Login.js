import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';

// ================================|| LOGIN ||================================ //

const Login = () => {
  let navigate = useNavigate();

  const checkToken = async () => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Đăng Nhập</Typography>
            <Typography component={Link} to="/login_teacher" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Dành cho giảng viên?
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

export default Login;
