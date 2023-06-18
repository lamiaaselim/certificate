function getCertificate() {
  var idInput = document.getElementById("idInput");
  var certificateContainer = document.getElementById("certificateContainer");

  var id = idInput.value;

  // قم بقراءة ملف JSON والتحقق من تطابق رقم الهوية
  fetch("certificates.json")
    .then(response => response.json())
    .then(data => {
      var certificate = data[id];

      if (certificate) {
        // عرض التفاصيل في عنصر العرض
        var certificateHTML = "<h2>شهادة تقدير</h2>";
        certificateHTML += "<p>اسم المستلم: " + certificate.name + "</p>";
        certificateHTML += "<p>تاريخ الاصدار: " + certificate.date + "</p>";
        // قم بإضافة المزيد من التفاصيل حسب احتياجاتك

        certificateContainer.innerHTML = certificateHTML;
      } else {
        certificateContainer.innerHTML = "<p>رقم الهوية غير صحيح</p>";
      }
    })
    .catch(error => {
      console.log("حدث خطأ في قراءة ملف JSON: ", error);
      certificateContainer.innerHTML = "<p>حدث خطأ في قراءة ملف الشهادة</p>";
    });
}

function printCertificate() {
  // طباعة الشهادة بمقاس A4
  window.print();
}

function downloadCertificate() {
  var certificateContainer = document.getElementById("certificateContainer");
  var certificateHTML = certificateContainer.innerHTML;

  // إنشاء ملف بصيغة صورة أو PDF
  var fileContent = "<html><head><title>شهادة تقدير</title></head><body>" + certificateHTML + "</body></html>";

  // تنزيل الملف
  var blob = new Blob([fileContent], { type: "text/html" });
  var url = URL.createObjectURL(blob);

  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "certificate.html"; // اسم الملف وامتداده
  downloadLink.click();
}
