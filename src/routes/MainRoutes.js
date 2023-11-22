import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import DashboardQllh from 'pages/qllh/qllh';
import DashboardQld from 'pages/qld/qld';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const DashboardQlsv = Loadable(lazy(() => import('pages/qlsv/qlsv')));
const DashboardQlmh = Loadable(lazy(() => import('pages/qlmh/qlmh')));
const StudentDetail = Loadable(lazy(() => import('pages/qlsv/StudentDetail')));

// render - utilities
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'qlsv',
      element: <DashboardQlsv />
    },
    {
      path: 'qlmh',
      element: <DashboardQlmh />
    },
    {
      path: 'qllh',
      element: <DashboardQllh />
    },

    {
      path: 'qld',
      element: <DashboardQld />
    },
    {
      path: 'student_detail',
      element: <StudentDetail />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
