/*(function () {
  window.payhere = {
    onCompleted: function () {},
    onDismissed: function () {},
    onError: function () {},

    startPayment: function (payment) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payment.sandbox
        ? "https://sandbox.payhere.lk/pay/checkout"
        : "https://www.payhere.lk/pay/checkout";

      for (const key in payment) {
        if (payment.hasOwnProperty(key)) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = payment[key];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit();
    }
  };
})();*/
