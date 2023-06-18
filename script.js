function getCertificate() {
  var idInput = document.getElementById("idInput");
  var certificateContainer = document.getElementById("certificateContainer");

  var id = idInput.value;

  // قراءة ملف JSON والتحقق من تطابق رقم الهوية
  fetch("certificates.json")
    .then(response => response.json())
    .then(data => {
      var certificate = data[id];

      if (certificate) {
        // عرض التفاصيل في عنصر العرض
        var certificateHTML = "<h2>شهادة تقدير</h2>";
        certificateHTML += "<p>اسم المستلم: " + certificate.name + "</p>";
        certificateHTML += "<p>تاريخ الإصدار: " + certificate.date + "</p>";
        // أضف المزيد من التفاصيل حسب الحاجة

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
  var certificateContainer = document.getElementById("certificateContainer").innerHTML;

  var printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write('<html><head><title>الشهادة</title></head><body>');
  printWindow.document.write('<div style="width: 21cm; margin: 0 auto;">');
  printWindow.document.write(certificateContainer);
  printWindow.document.write('</div></body></html>');
  printWindow.document.close();
  printWindow.print();
}

function downloadCertificate() {
  var certificateContainer = document.getElementById("certificateContainer").innerHTML;

  var fileContent = '<html><head><title>الشهادة</title></head><body>';
  fileContent += '<div style="width: 21cm; margin: 0 auto;">';
  fileContent += certificateContainer;
  fileContent += '</div></body></html>';

  var blob = new Blob([fileContent], { type: 'text/html' });
  var url = URL.createObjectURL(blob);

  var downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'certificate.html';
  downloadLink.click();
}
