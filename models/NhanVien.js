class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  tinhTongLuong = function () {
    let tongLuong = 0;
    if (this.chucvu == "sep") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucvu == "truongPhong") {
      tongLuong = this.luongCB * 2;
    } else if (this.chucvu == "nhanVien") {
      tongLuong = this.luongCB * 1;
    }
    return tongLuong;
  };

  xepLoai = function () {
    let xepLoaiNV = "";
    if (this.chucvu == "nhanVien") {
      if (this.gioLam >= 192) {
        xepLoaiNV = "Xuất sắc";
      } else if (176 >= this.gioLam < 192) {
        xepLoaiNV = "Giỏi";
      } else if (160 >= this.gioLam < 176) {
        xepLoaiNV = "Khá";
      } else if (this.gioLam < 160) {
        xepLoaiNV = "Trung bình";
      }
    }
    return xepLoaiNV;
  };
}
