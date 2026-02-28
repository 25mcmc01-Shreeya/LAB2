$(function () {

  $.getJSON("task9.json", function (schema) {

    const $form = $("#autoForm");

    // ---------- BUILD FORM ----------
    schema.fields.forEach(field => {

      const $wrapper = $("<div>", { class: "field-block", "data-id": field.id });

      const $label = $("<label>").text(field.label);
      $wrapper.append($label);

      let $control;

      if (field.type === "select") {
        $control = $("<select>", { id: field.id, name: field.id });
        $control.append(`<option value="">Select</option>`);

        if (field.options) {
          field.options.forEach(opt => {
            $control.append(`<option value="${opt}">${opt}</option>`);
          });
        }
      } else {
        $control = $("<input>", {
          type: field.type,
          id: field.id,
          name: field.id
        });
      }

      $wrapper.append($control);
      $wrapper.append(`<div class="error-text" id="err-${field.id}"></div>`);

      $form.append($wrapper);
    });

    $form.append(`<button class="btn-submit">Register</button>`);

    // ---------- INITIAL VISIBILITY ----------
    toggleConditionalFields();
    $(".field-block[data-id='state']").addClass("hidden");

    // ---------- EVENTS ----------
    $(document).on("change", "#country", handleCountryChange);
    $(document).on("change", "#accountType", toggleConditionalFields);
    $(document).on("input change", "input, select", function () {
      validateSingle($(this).attr("id"));
    });

    // ---------- COUNTRY → STATE ----------
    function handleCountryChange() {
      const country = $("#country").val();
      const $state = $("#state");
      const $stateBlock = $(".field-block[data-id='state']");

      $state.empty().append(`<option value="">Select State</option>`);

      if (schema.statesByCountry[country]) {
        schema.statesByCountry[country].forEach(s => {
          $state.append(`<option value="${s}">${s}</option>`);
        });
        $stateBlock.removeClass("hidden");
      } else {
        $stateBlock.addClass("hidden");
      }
    }

    // ---------- ACCOUNT TYPE LOGIC ----------
    function toggleConditionalFields() {
      const type = $("#accountType").val();

      const showStudent = type === "Student";
      const showPro = type === "Professional";

      $(".field-block[data-id='college']").toggleClass("hidden", !showStudent);
      $(".field-block[data-id='company']").toggleClass("hidden", !showPro);
    }

    // ---------- VALIDATION ----------
    function validateSingle(id) {
      const val = $("#" + id).val().trim();
      const $err = $("#err-" + id);
      $err.hide().text("");

      if (!val && $("#" + id).closest(".hidden").length === 0) {
        $err.text("This field is required").show();
        return false;
      }

      if (id === "email" && val) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          $err.text("Invalid email").show();
          return false;
        }
      }

      if (id === "password" && val) {
        if (val.length < 8) {
          $err.text("Password must be at least 8 characters").show();
          return false;
        }
      }

      return true;
    }

    // ---------- SUBMIT ----------
    $form.on("submit", function (e) {
      e.preventDefault();

      let ok = true;

      schema.fields.forEach(f => {
        if (!validateSingle(f.id)) ok = false;
      });

      if (!ok) return;

      $("#successMsg")
        .text("Registration Successful!")
        .show();
    });

  });

});