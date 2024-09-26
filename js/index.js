let arrNhanVien = [];

/* 
------------------------------------------
--------------GET VALUE FORM--------------
------------------------------------------
 */
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
  let nhanVien = new NhanVien();

  // tạo một biến cờ hiệu để check trường hợp khi nào trả về đối tượng nhân viên
  let flag = true;

  for (let field of arrField) {
    // let value = field.value; // destructuring
    let { value, id } = field; // field = mã sinh viên ==> txtMaSV
    sinhVien[id] = value;

    // Truy cập tới thẻ cha gần nhất của input
    let theThongBao = field.parentElement.querySelector("span");

    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      // dữ liệu không bị rỗng
      // if (id == "txtPass" && !checkMinMaxValue(theThongBao, value, 6, 10)) {
      //   flag = false;
      // }
      // truy xuất tới các thuộc tính data-validation
      let dataValue = field.getAttribute("data-validation"); // undifinded | email | minmax
      let dataMin = field.getAttribute("data-min") * 1;
      let dataMax = field.getAttribute("data-max") * 1;
      if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "minMax" &&
        !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
      ) {
        flag = false;
      }
    }
  }
  return flag ? nhanVien : null;
}

/* 
----------------------------------------------
----------------THÊM NHÂN VIÊN----------------
----------------------------------------------
 */
// Nhấn nút enter thay vì click vào nút, ấy id của form
document.getElementById("formQLNV").onsubmit = function (event) {
  // prevendDefault dùng để ngăn chặn sự kiện reload
  event.preventDefault();

  // Thực hiện xử lý và truy cập lấy tất cả dữ liệu từ các input có trong giao diện
  let sinhVien = getValueForm();
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    setLocalStorage("arrNhanVien", arrNhanVien);
    // hàm render có thể gọi ở bất kỳ đâu vì có cơ chế hosting
    renderDataSinhVien();
    // trỏ tới thẻ form đang chạy unsubmit
    // xóa các giá trị người dùng nhập sau khi submit (reset lại các ô input)
    event.target.reset();
  }
};

/* 
----------------------------------------------
----HIỂN THỊ THÔNG TIN NHÂN VIÊN LÊN TABLE----
----------------------------------------------
 */
function renderDataNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    // dữ liệu lấy từ local ==> dữ liệu không có phương thức
    // tạo ra một đối tượng mới ===> có phương thức nhưng không có dữ liệu
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;
    content += `
            <tr>
                <td>${tknv}</td>
                <td>${name}</td>
                <td>${txtEmail}</td>
                <td>${email}</td>
                <td>${datepicker}</td>
                
                <td>${newSinhVien.tinhDiemTrungBinh().toFixed(2)}</td>
                <td>
                    <button onclick="getInfoSinhVien('${txtMaSV}')" class="btn btn-warning">Sửa</button>
                     <button onclick="deleteSinhVien('${txtMaSV}')" class="btn btn-danger mt-1">Xóa</button>
                </td>
            </tr>
        `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrSinhVien");
  if (dataLocal) {
    console.log(dataLocal);
    arrSinhVien = dataLocal;
    renderDataSinhVien();
  }
};
