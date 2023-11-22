// assets
import { DashboardOutlined, SmileOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  SmileOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const studentDetail = {
  id: 'group-dashboard-studentDetail',
  type: 'group',
  children: [
    {
      id: 'student_detail',
      title: 'Chi tiết sinh viên',
      type: 'item',
      url: '/student_detail',
      icon: icons.SmileOutlined,
      breadcrumbs: false
    }
  ]
};

export default studentDetail;
