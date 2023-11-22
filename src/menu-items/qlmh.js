// assets
import { DashboardOutlined, UsergroupDeleteOutlined, ReadOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupDeleteOutlined,
  ReadOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const qlmh = {
  id: 'group-dashboard-qlmh',
  type: 'group',
  children: [
    {
      id: 'qlmh',
      title: 'Quản lý môn học',
      type: 'item',
      url: '/qlmh',
      icon: icons.ReadOutlined,
      breadcrumbs: false
    }
  ]
};

export default qlmh;
