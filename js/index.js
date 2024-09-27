let arrNhanVien = [];

/* 
------------------------------------------
--------------GET VALUE FORM--------------
------------------------------------------
 */
function getValueForm() {
  console.log("vào get value");
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
  let nhanVien = new NhanVien();

  // tạo một biến cờ hiệu để check trường hợp khi nào trả về đối tượng nhân viên
  let flag = true;

  for (let field of arrField) {
    // let value = field.value; // destructuring
    let { value, id } = field; // field = mã sinh viên ==> tknv
    nhanVien[id] = value;

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
// Nhấn nút enter thay vì click vào nút, lấy id của form
document.getElementById("formQLNV").onsubmit = function (event) {
  console.log("đã click");
  // prevendDefault dùng để ngăn chặn sự kiện reload
  event.preventDefault();

  // Thực hiện xử lý và truy cập lấy tất cả dữ liệu từ các input có trong giao diện
  let nhanVien = getValueForm();
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    console.log(arrNhanVien);
    setLocalStorage("arrNhanVien", arrNhanVien);
    // hàm render có thể gọi ở bất kỳ đâu vì có cơ chế hosting
    renderDataNhanVien();
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
                <td>${email}</td>
                <td>${datepicker}</td>
                <td>${chucvu}</td>
                <td>${newNhanVien.tinhTongLuong()}</td>
                <td>${newNhanVien.xepLoai()}</td>
                <td>
                    <button class="btn btn-warning">Sửa</button>
                     <button class="btn btn-danger mt-1">Xóa</button>
                </td>
            </tr>
        `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrNhanVien");
  if (dataLocal) {
    console.log(dataLocal);
    arrNhanVien = dataLocal;
    renderDataNhanVien();
  }
};

// --------------- local storage ----------------
// tạo ra một function sẽ giúp đưa bất kĩ dữ liệu nào xuống local storage lưu trữ
function setLocalStorage(key, data) {
  let dataString = JSON.stringify(data);
  localStorage.setItem(key, dataString);
}

function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

/* 
----------------------------------------------
--------------GET INFO NHÂN VIÊN--------------
----------------------------------------------
 */
// B1. gắn function getinfoSinhVien vao nút sửa
// B2. thực hiện tìm kiếm sinh viên trong mảng
// B3. thực hiện đưa dữ liệu viết lên input trong form cho người dùng chỉnh sửa
// B4. Ngăn chặn người dùng chỉnh sửa tknv (disabled, read only)
function getInfoNhanVien(tknv) {
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == tknv);
  if (nhanVien) {
    // trả về cái mảng,ko phải lệnh dom nên không thể .value để lấy dữ liệu
    let arrField = document.querySelectorAll(
      "#formQLNV input,#formQLNV select"
    );
    for (let field of arrField) {
      // field đại diện cho các select input tìm kiếm được trong form
      field.value = sinhVien[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
}

/* 
-------------------------------------------
---------------XÓA SINH VIÊN---------------
-------------------------------------------
 */
function deleteNhanVien(tknv) {
  // khi xóa 1 phần tử, sử dụng phương thức splice(vị trí bắt đầu, số lượng phần tử cần xóa)
  // xử lý tìm kiếm vị trí sinh viên trong mảng
  let index = arrNhanVien.findIndex((item, i) => item.tknv == tknv);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderDataNhanVien();
    setLocalStorage("arrNhanVien", arrNhanVien);
  }
  // thao tác xóa nhân viên cập nhật dữ liệu
}

// chức năng cập nhật nhân viên
// B1. DOM tới nút button cập nhật và tạo một sự kiện click
// B2. Xử lý lấy dữ liệu người dùng đã cập nhật trên form
// B3. Tìm kiếm tới vị trí của phần tử được cập nhật
// B4. Thay thế dữ liệu mới vào vị trí của phần tử được cập nhật
// B5. Thực hiện chạy lại hàm render và cập nhật xuống local storage
// B6. CLear toàn bộ dữ liệu của form và tắt readOnly của input

document.getElementById("btnCapNhat").onclick = function () {
  console.log("ĐÃ CLICK CẬP NHẬT");
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNhanVien.findIndex((item, i) => item.tknv == sinhVien.tknv);
    if (index != -1) {
      arrNhanVien[index] = sinhVien;
      renderDataNhanVien();
      setLocalStorage("arrNhanVien", arrNhanVien);
      document.getElementById("tknv").readOnly = false;
      document.getElementById("formQLNV").reset();
    }
  }
};

// ------------- tìm kiếm nhân viên --------------
document.getElementById("searchName").oninput = function (event) {
  console.log("ĐÃ CLICK tìm kiếm");

  let keyWord = event.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);
  console.log(newKeyWord);
  let arrSearch = arrNhanVien.filter((item, index) => {
    // item.txtTenSV ="Phát" newKeyWord = phat
    // item.txtTenSV.includes(newKeyWord) ==> true
    let newTenSV = removeVietnameseTones(item.txtTenSV.trim().toLowerCase());
    return newTenSV.includes(newKeyWord);
  });
  renderDataNhanVien(arrSearch);
};
