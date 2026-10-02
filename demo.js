let currentGateCode = "";
let isGateValid = false;
let totalRevenue = 0;
let totelGateSales = 0;
let choice;
let handleInput;
do {
  let menu = prompt(`
    ===========================
        HỆ THỐNG BÁN VÉ KHU VUI CHƠI
        ===========================
        1.nhập và kiểm chuẩn mã vé cổng
        2.tính tiền vé trò chơi
        3.thẩm định vé cổng may mắn
        0.thoát chương trình
        lựa chọn của bạn(0-3): 
`);
  choice = menu !== null ? menu.trim() : null;

  switch (choice) {
    case "1":
      currentGateCode = "";
      isGateValid = false;

      let valueInput = prompt("mã vé vào cổng");

      if (valueInput === null || valueInput.trim() === "") {
        console.log("Chưa nhập mã vé vào cổng");
        isGateValid = false;
        break;
      }

      handleInput = valueInput.trim().toUpperCase();
      if (handleInput.length < 6) {
        console.log("độ dài nhở hơn 6 ký tự");
        isGateValid = false;
        break;
      } else if (!handleInput.startsWith("PRK-")) {
        console.log("sai tiền tố PRK");
        isGateValid = false;
        break;
      } else if (handleInput.includes(" ")) {
        console.log("chứa khoảng cách ở giữa");
        isGateValid = false;
        break;
      }
      currentGateCode = handleInput;
      isGateValid = true;
      console.log("lưu mã thành công,mã vào cổng: " + currentGateCode);

      break;
    case "2":
      if (isGateValid === true) {
        let cancel = false;
        let resultRideCount;

        while (true) {
          let inputRideCount = prompt(
            "Nhập số lượng vé trò chơi (số nguyên > 0):",
          );
          if (inputRideCount === null) {
            cancel = true;
            break;
          }

          let rideCount = inputRideCount.trim();
          let convertNUmber = Number(rideCount);
          if (
            rideCount !== "" &&
            !rideCount.includes(".") &&
            Number.isInteger(convertNUmber) &&
            convertNUmber > 0
          ) {
            resultRideCount = convertNUmber;
            break;
          }
        }

        if (cancel) {
          console.log("Đã hủy tính vé trò chơi.");
          break;
        }

        let resultPricePerRide;

        while (true) {
          let inputPricePerRide = prompt("Nhập  giá mỗi trò chơi (VNĐ):");
          if (inputPricePerRide === null) {
            cancel = true;
            break;
          }

          let pricePerRide = inputPricePerRide.trim();
          let convertNUmberpricePerRide = Number(pricePerRide);
          if (
            pricePerRide !== "" &&
            !pricePerRide.includes(".") &&
            Number.isInteger(convertNUmberpricePerRide) &&
            convertNUmberpricePerRide > 0
          ) {
            resultPricePerRide = convertNUmberpricePerRide;
            break;
          }
        }

        if (cancel) {
          console.log("Đã hủy tính vé trò chơi.");
          break;
        }

        let salePrice;
        let basePrice = resultPricePerRide * resultRideCount;

        if (resultRideCount >= 4) {
          salePrice = basePrice * 0.1;
        } else {
          salePrice = 0;
        }
        let addPrice = (basePrice - salePrice) * 0.08;

        let totalPrice = Math.round(basePrice - salePrice + addPrice);

        totalRevenue += totalPrice;
        totelGateSales++;

        console.log("===========================");
        console.log("         Hóa đơn trò chơi          ");
        console.log("===========================");
        console.log(`Mã vé    : ${currentGateCode}`);
        console.log(`Số lượng vé       : ${resultRideCount}`);
        console.log(
          `giá vé trò chơi  : ${resultPricePerRide.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Chi phí cơ sở     : ${basePrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Tiền giảm giá     : ${salePrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Phụ phí an toàn    : ${addPrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log("==================================");
        console.log(
          `TỔNG THANH TOÁN   : ${totalPrice.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log("===========================");

        currentGateCode = "";
        isGateValid = false;
      } else {
        console.log("vui lòng nhập mã phiếu khám bệnh");
      }
      break;
    case "3":
      let inputValue = prompt(`nhập chuỗi số seri in trên vé cổng.`);

      if (inputValue === null) {
        console.log("cancel thành công!!");
        break;
      }
      if (inputValue.trim() === "") {
        console.log("dữ liệu nhập vào không được bỏ trống!!!");
        break;
      }
      if (/[^0-9]/.test(inputValue.trim())) {
        console.log("dữ liệu nhập vào không hợp lệ!!!");
        break;
      } else if (inputValue.trim().length < 2) {
        console.log("dữ liệu nhập vào không hợp lệ!!!");
        break;
      }

      let checkFullZero = true;
      for (let i = 0; i <= inputValue.trim().length - 1; i++) {
        if (inputValue.trim()[i] !== "0") {
          checkFullZero = false;
          break;
        }
      }

      if (checkFullZero) {
        console.log("dư liệu nhập vào ko hợp lệ");
        break;
      }
      let resultInput = inputValue.trim();

      let reversedInput = resultInput.split("").reverse().join("");
      let isPalindrome = false;
      if (resultInput === reversedInput) {
        isPalindrome = true;
      }
      let digitSum = false;
      let total = 0;
      for (let i = 0; i < resultInput.length; i++) {
        total += Number(resultInput[i]);
      }
      if (total % 9 === 0) {
        digitSum = true;
      }

      let reward = "";
      if (isPalindrome && digitSum) {
        reward =
          "Giải Đặc biệt - vé chọn gói ngày cho 2 người trị giá 800.000 VNĐ";
      } else if (isPalindrome && !digitSum) {
        reward = "Giải Nhất - ảnh lưu niệm in khung trị giá 100.000 VNĐ";
      } else if (!isPalindrome && digitSum) {
        reward = "Giải Nhì - Voucher giảm 25.000 VNĐ lần khám kế tiếp";
      } else {
        reward = "Không trúng thưởng";
      }

      console.log("===========================");
      console.log("        KẾT QUẢ THẨM ĐỊNH MÃ CỔNG SƠ MAY MẮN       ");
      console.log("===========================");
      console.log(`Mã số gốc           : ${resultInput}`);
      console.log(
        `Mã đảo ngược        : ${reversedInput} (${isPalindrome ? "Đối xứng" : "Không đối xứng"})`,
      );
      console.log(`Tổng chữ số         : ${total}`);
      console.log(`Chia hết cho 9      : ${digitSum ? "Có" : "Không"}`);
      console.log(`Kết quả giải thưởng : ${reward}`);
      console.log("===========================");
      break;
    case "0":
      console.log("===========================");
      console.log("       BÁO CÁO TỔNG KẾT CA Bán VÉ     ");
      console.log("===========================");

      if (totelGateSales === 0) {
        console.log("Nay KHÔNG CÓ AI ĐI CHƠI.");
      } else {
        const averageRevenue = Math.round(totalRevenue / totelGateSales);

        console.log(`Tổng số lượt khám đã thanh toán : ${totelGateSales} vé`);
        console.log(
          `Tổng doanh thu            : ${totalRevenue.toLocaleString("vi-VN")} VNĐ`,
        );
        console.log(
          `Doanh thu trung bình mỗi     : ${averageRevenue.toLocaleString("vi-VN")} VNĐ`,
        );
      }
      console.log("===========================");
      break;

    default:
      console.log("lựa chọn không hợp lệ!!!");
      break;
  }
} while (choice !== "0");
