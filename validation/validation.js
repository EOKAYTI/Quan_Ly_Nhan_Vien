// Kiểm tra dữ liệu rỗng
function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiểm tra độ dài ký tự (min - max)
function checkMinMaxValue(theThongBao, value, min, max) {
  let doDaiValue = value.length;
  if (doDaiValue < min || doDaiValue > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} - ${max}`;
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiểm tra định dạng email
function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng email";
    return false;
  }
}

// Kiểm tra định dạng mật khẩu
function checkPasswordValue(theThongBao, value) {
  // Mật khẩu từ 6-10 ký tự, có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt
  let regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,10}$/;
  let checkPassword = regexPassword.test(value);
  if (checkPassword) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu từ 6-10 ký tự, có ít nhất 1 ký tự viết hoa, 1 ký tự số và 1 ký tự đặc biệt";
    return false;
  }
}

// Kiểm tra định dạng ngày
function checkDateValue(theThongBao, value) {
  let regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/; // Định dạng mm/dd/yyyy
  if (regexDate.test(value)) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng ngày (mm/dd/yyyy)";
    return false;
  }
}

// Kiểm tra lương cơ bản
function checkSalaryValue(theThongBao, value) {
  let salary = parseFloat(value);
  if (salary < 1000000 || salary > 20000000) {
    theThongBao.innerHTML = "Lương cơ bản phải từ 1.000.000 đến 20.000.000";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiểm tra chức vụ
function checkPositionValue(theThongBao, value) {
  const validPositions = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
  if (!validPositions.includes(value)) {
    theThongBao.innerHTML =
      "Vui lòng chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// Kiểm tra số giờ làm
function checkWorkingHoursValue(theThongBao, value) {
  let hours = parseInt(value);
  if (hours < 80 || hours > 200) {
    theThongBao.innerHTML = "Số giờ làm trong tháng phải từ 80 đến 200 giờ";
    return false;
  } else {
    theThongBao.innerHTML = "";
    return true;
  }
}

// /*  Kiểm tra dũ liệu rỗng,
//     kiểm tra định dạng email,
//     kiểm tra giới hạn ký tự,
//     kiểm tra xem giá trị nhập vào có trong khoảng hay không,
//     kiểm tra nhập vào chữ không cho phép số */

// function checkEmptyValue(theThongBao, value) {
//   // value = ""
//   if (value == "") {
//     // thông báo lỗi
//     theThongBao.innerHTML = "Vui lòng không bỏ trống";
//     return false;
//   } else {
//     // xóa thông báo khi không còn lỗi
//     theThongBao.innerHTML = "";
//     return true;
//   }
// }

// // value ="abcdef" ==> yêu cầu người dùng nhập dữ liệu từ 4-10 ký tự
// //6 -10
// function checkMinMaxValue(theThongBao, value, min, max) {
//   let doDaiValue = value.length;
//   if (doDaiValue < min || doDaiValue > max) {
//     theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} - ${max}`;
//     return false;
//   } else {
//     theThongBao.innerHTML = "";
//     return true;
//   }
// }

// function checkEmailValue(theThongBao, value) {
//   let regexEmail =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   let checkEmail = regexEmail.test(value); // true || false
//   if (checkEmail) {
//     theThongBao.innerHTML = "";
//     return true;
//   } else {
//     theThongBao.innerHTML = "Vui lòng nhập đúng định dạng email";
//     return false;
//   }
// }

// function checkPasswordValue(theThongBao, value) {
//   let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
//   let checkPassword = regexPassword.test(value);
//   if (checkPassword) {
//     theThongBao.innerHTML = "";
//     return true;
//   } else {
//     theThongBao.innerHTML =
//       "Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và 1 ký tự đặc biệt";
//     return false;
//   }
// }
