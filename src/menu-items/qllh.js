// assets
import { DashboardOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupDeleteOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const qllh = {
  id: 'group-dashboard-qllh',
  type: 'group',
  children: [
    {
      id: 'qllh',
      title: 'Quản lý lớp học',
      type: 'item',
      url: '/qllh',
      icon: icons.UsergroupDeleteOutlined,
      breadcrumbs: false
    }
  ]
};

export default qllh;
