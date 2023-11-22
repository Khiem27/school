// assets
import { DashboardOutlined, TrophyOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  TrophyOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const qld = {
  id: 'group-dashboard-qld',
  type: 'group',
  children: [
    {
      id: 'qld',
      title: 'Quản lý điểm',
      type: 'item',
      url: '/qld',
      icon: icons.TrophyOutlined,
      breadcrumbs: false
    }
  ]
};

export default qld;
