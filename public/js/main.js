document.addEventListener('DOMContentLoaded', function () {
  var deleteForms = document.querySelectorAll('form[onsubmit]');
  deleteForms.forEach(function (form) {
    var originalOnsubmit = form.getAttribute('onsubmit');
    if (originalOnsubmit && originalOnsubmit.indexOf('confirm') !== -1) {
      form.addEventListener('submit', function (e) {
        if (!confirm('确定执行此操作？')) {
          e.preventDefault();
        }
      });
      form.removeAttribute('onsubmit');
    }
  });

  var dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(function (input) {
    if (!input.value) {
      var today = new Date();
      var yyyy = today.getFullYear();
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var dd = String(today.getDate() + 1).padStart(2, '0');
      input.value = yyyy + '-' + mm + '-' + dd;
    }
  });

  var tables = document.querySelectorAll('.table');
  tables.forEach(function (table) {
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function (row, index) {
      if (index % 2 === 1) {
        row.style.backgroundColor = '#fafbfc';
      }
    });
  });
});
