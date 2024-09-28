let arrNhanVien = [];

/* 
------------------------------------------
--------------GET VALUE FORM--------------
------------------------------------------
 */
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLNV input, #formQLNV select");
  let nhanVien = new NhanVien();
  let flag = true;

  for (let field of arrField) {
    let { value, id } = field;
    nhanVien[id] = value;

    // Truy cập tới thẻ cha gần nhất của input
    let theThongBao = field.parentElement.querySelector("span");

    // Kiểm tra dữ liệu rỗng
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      // Lấy thuộc tính data-validation và tách thành mảng các thuộc tính
      let dataValue = field.getAttribute("data-validation");

      if (dataValue) {
        let validations = dataValue.split(","); // Tách các thuộc tính validation bằng dấu phẩy

        let dataMin = field.getAttribute("data-min") * 1;
        let dataMax = field.getAttribute("data-max") * 1;

        // Duyệt qua từng thuộc tính validation
        for (let validation of validations) {
          switch (
            validation.trim() // Loại bỏ khoảng trắng dư thừa
          ) {
            case "email":
              if (!checkEmailValue(theThongBao, value)) {
                flag = false;
              }
              break;
            case "minmax":
              if (!checkMinMaxValue(theThongBao, value, dataMin, dataMax)) {
                flag = false;
              }
              break;
            case "text":
              if (!/^[a-zA-Z\s]+$/.test(value)) {
                theThongBao.innerHTML = "Tên nhân viên phải là chữ";
                flag = false;
              }
              break;
            case "date":
              if (!checkDateValue(theThongBao, value)) {
                flag = false;
              }
              break;
            case "salary":
              if (!checkSalaryValue(theThongBao, value, dataMin, dataMax)) {
                flag = false;
              }
              break;
            case "position":
              if (!checkPositionValue(theThongBao, value)) {
                flag = false;
              }
              break;
            case "workingHours":
              if (
                !checkWorkingHoursValue(theThongBao, value, dataMin, dataMax)
              ) {
                flag = false;
              }
              break;
            case "password": // Kiểm tra mật khẩu
              if (!checkPasswordValue(theThongBao, value)) {
                flag = false;
              }
              break;
          }
        }
      }
    }
  }
  return flag ? nhanVien : null;
}

// function getValueForm() {
//   console.log("vào get value");
//   let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");
//   let nhanVien = new NhanVien();

//   // tạo một biến cờ hiệu để check trường hợp khi nào trả về đối tượng nhân viên
//   let flag = true;

//   for (let field of arrField) {
//     // let value = field.value; // destructuring
//     let { value, id } = field; // field = mã sinh viên ==> tknv
//     nhanVien[id] = value;

//     // Truy cập tới thẻ cha gần nhất của input
//     let theThongBao = field.parentElement.querySelector("span");

//     if (!checkEmptyValue(theThongBao, value)) {
//       flag = false;
//     } else {
//       // dữ liệu không bị rỗng
//       // if (id == "txtPass" && !checkMinMaxValue(theThongBao, value, 6, 10)) {
//       //   flag = false;
//       // }
//       // truy xuất tới các thuộc tính data-validation
//       let dataValue = field.getAttribute("data-validation"); // undifinded | email | minmax
//       let dataMin = field.getAttribute("data-min") * 1;
//       let dataMax = field.getAttribute("data-max") * 1;
//       if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
//         flag = false;
//       } else if (
//         dataValue == "minMax" && !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
//       ) {
//         flag = false;
//       }
//     }
//   }
//   return flag ? nhanVien : null;
// }

/* 
----------------------------------------------
----------------THÊM NHÂN VIÊN----------------
----------------------------------------------
 */
// Nhấn nút enter thay vì click vào nút, lấy id của form
document.getElementById("btnThemNV").onclick = function (event) {
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
                    <button onclick="getInfoNhanVien('${tknv}')" data-toggle="modal"
                    data-target="#myModal" class="btn btn-warning">Sửa</button>
                     <button onclick="deleteNhanVien('${tknv}')" class="btn btn-danger mt-1">Xóa</button>
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

/* 
-------------------------------------------
---------------LOCAL STORAGE---------------
-------------------------------------------
 */
// tạo ra một function sẽ giúp đưa bất kỳ dữ liệu nào xuống local storage lưu trữ
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
function getInfoNhanVien(tknv) {
  let nhanVien = arrNhanVien.find((item, index) => item.tknv == tknv);
  if (nhanVien) {
    // trả về cái mảng,ko phải lệnh dom nên không thể .value để lấy dữ liệu
    let arrField = document.querySelectorAll(
      "#formQLNV input,#formQLNV select"
    );
    for (let field of arrField) {
      // field đại diện cho các select input tìm kiếm được trong form
      field.value = nhanVien[field.id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
  }
  renderDataNhanVien();
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

/* 
-------------------------------------------
-------------CẬP NHẬT NHÂN VIÊN------------
-------------------------------------------
 */
document.getElementById("btnCapNhat").onclick = function () {
  console.log("ĐÃ CLICK CẬP NHẬT");
  let nhanVien = getValueForm();
  if (nhanVien) {
    let index = arrNhanVien.findIndex((item, i) => item.tknv == nhanVien.tknv);
    if (index != -1) {
      arrNhanVien[index] = nhanVien;
      renderDataNhanVien();
      setLocalStorage("arrNhanVien", arrNhanVien);
      document.getElementById("tknv").readOnly = false;
      document.getElementById("formQLNV").reset();
    }
  }
};

/* 
-------------------------------------------
----------TÌM NHÂN VIÊN THEO LOẠI----------
-------------------------------------------
 */
document.getElementById("searchName").oninput = function (event) {
  // Lấy từ khóa tìm kiếm và chuẩn hóa nó
  let keyWord = event.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);

  // Lọc nhân viên dựa trên loại nhân viên
  let arrSearch = arrNhanVien.filter((item, index) => {
    // Chuyển đổi đối tượng thành instance của NhanVien nếu chưa phải
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);

    // Gọi hàm xepLoai() để lấy loại nhân viên
    let loaiNV = nhanVien.xepLoai().trim().toLowerCase();
    let newLoaiNV = removeVietnameseTones(loaiNV);

    // Kiểm tra xem loại nhân viên có chứa từ khóa tìm kiếm hay không
    return newLoaiNV.includes(newKeyWord);
  });

  // Hiển thị kết quả sau khi tìm kiếm
  renderDataNhanVien(arrSearch);
};
