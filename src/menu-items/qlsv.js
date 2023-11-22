// assets
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const qlsv = {
  id: 'group-dashboard-qlsv',
  type: 'group',
  children: [
    {
      id: 'qlsv',
      title: 'Quản lý sinh viên',
      type: 'item',
      url: '/qlsv',
      icon: icons.UserOutlined,
      breadcrumbs: false
    }
  ]
};

export default qlsv;
