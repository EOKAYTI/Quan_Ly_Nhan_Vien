class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  tongLuong = function () {
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

  xepLoai = function () {};
}
