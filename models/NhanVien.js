class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = "";
  xepLoaiNV = "";

  tinhTongLuong = function () {
    if (this.chucvu == "Giám đốc") {
      this.tongLuong = this.luongCB * 3;
    } else if (this.chucvu == "Trưởng phòng") {
      this.tongLuong = this.luongCB * 2;
    } else if (this.chucvu == "Nhân viên") {
      this.tongLuong = this.luongCB * 1;
    }
    return this.tongLuong;
  };

  xepLoai = function () {
    if (this.chucvu == "Nhân viên") {
      if (this.gioLam >= 192) {
        this.xepLoaiNV = "Xuất sắc";
      } else if (176 >= this.gioLam < 192) {
        this.xepLoaiNV = "Giỏi";
      } else if (160 >= this.gioLam < 176) {
        this.xepLoaiNV = "Khá";
      } else if (this.gioLam < 160) {
        this.xepLoaiNV = "Trung bình";
      }
    }
    return this.xepLoaiNV;
  };
}
