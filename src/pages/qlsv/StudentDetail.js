import '../../css/StudentDetail.css';

const StudentDetail = () => {
  const studentImage = 'https://cdn-icons-png.flaticon.com/512/5850/5850276.png'; // Thay đổi đường dẫn đến hình ảnh của bạn

  return (
    <div className="container">
      <header>
        <h1>Chi tiết sinh viên</h1>
      </header>
      <section className="student-details">
        <div className="details-item">
          <img src={studentImage} alt="Student" className="student-image" />
        </div>
        <div className="details-item">
          <label htmlFor="fullName">Họ và tên:</label>
          <span id="fullName">Nguyễn Văn A</span>
        </div>
        <div className="details-item">
          <label htmlFor="dob">Ngày tháng năm sinh:</label>
          <span id="dob">01/01/1990</span>
        </div>
        <div className="details-item">
          <label htmlFor="gender">Giới tính:</label>
          <span id="gender">Nam</span>
        </div>
        <div className="details-item">
          <label htmlFor="address">Địa chỉ:</label>
          <span id="address">123 Đường ABC, Quận XYZ</span>
        </div>
        {/* Thêm các trường thông tin khác tương tự */}
      </section>
    </div>
  );
};

export default StudentDetail;
