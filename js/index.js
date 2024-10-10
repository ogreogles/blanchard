  var tel = document.querySelector('input[type="tel"]');

  var telMask = new Inputmask("+7 (999) 999-99-99");
  telMask.mask(tel);

// JustValidate

const validator = new JustValidate(".contacts__form", {
  focusInvalidField: true,
  lockForm: true,
  errorFieldCssClass: "is-invalid",
  colorWrong: "#D11616",
});
validator
.addField(".contacts__form--name", [
  {
    rule: "required",
    errorMessage: "Это обязательное поле",
  },
  {
    validator: (value) => {
      return !/[^A-zА-яЁё \s]/.test(value);
    },
    errorMessage: "Введите только буквы",
  },

  {
    rule: "minLength",
    value: 2,
    errorMessage: "Имя слишком короткое",
  },
  {
    rule: "maxLength",
    value: 30,
    errorMessage: "Имя слишком длинное",
  },
]);
  validator
    .addField(".contacts__form--tel", [
      {
        rule: "required",
        errorMessage: "Это обязательное поле",
      },
      {
        validator: () => {
          const phone = tel.inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: "Номер слишком короткий",
      },
    ])
   .onSuccess((event) => {
    console.log("Validation passes and form submitted", event);

    let formData = new FormData(event.target);

    console.log(...formData);

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log("Отправлено");
        }
      }
    };

    xhr.open("POST", "mail.php", true);
    xhr.send(formData);

    event.target.reset();
    alert("Спасибо за заявку! Мы обязательно Вам перезвоним.");
  });

