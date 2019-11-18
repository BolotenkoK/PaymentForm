document.addEventListener('DOMContentLoaded', function () {

  
  // These are the constraints used to validate the form
  var constraints = {
    zipCode: {
      presence: true,
      format: {
        pattern: '\\d{5}',
        message: 'Should contains 5 digits'
      }
    },
    month: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 31
      }
    },
    year: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 2019,
        lessThanOrEqualTo: 2028
      }
    },
    firstName: {
      presence: true,
      format: {
        pattern: '^[А-Яа-яA-Za-z]+$',
        message: 'Should contains only characters'
      }
    },
    lastName: {
      presence: true,
      format: {
        pattern: '^[А-Яа-яA-Za-z]+$',
        message: 'Should contains only characters'
      }
    },
    cardNumber: {
      presence: true,
      format: {
        pattern: '\\d{16}',
        message: 'Should contains 16 digits'
      }
    },
    cvvCvc: {
      presence: true,
      format: {
        pattern: '^[0-9]{3,4}$',
        message: 'Should contains 3 or 4 digits'
      }
    }
  };
  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form#paymentForm");
  form.addEventListener("submit", (e) => {
    var isValid = isValidForm(form);
    if(!isValid){
      e.preventDefault();
    }
    else{
      alert("submitting...");
      document.location.reload(true);
    }    
  });

  //Validation when Enter or Tab clicked
  var inputs = document.querySelectorAll("input, textarea, select")
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).onkeydown = function (e) {
      if (e.keyCode == 13 || e.keyCode == 9) {
        e.preventDefault();
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name])
      }
    };

  }

  //Remove errors when click somewhere
  document.addEventListener("click", (evt) => {
    var formGroups = form.querySelectorAll('.form-group');
    _.each(formGroups, (group) => {
      resetFormGroup(group);
    });
  });

  function isValidForm(form) {
    // validate the form against the constraints
    var errors = validate(form, constraints);    
    if (!_.isEmpty(errors)) {
      showFirstError(form, errors);
      return false;
    }
    return true;
  }

  // Updates the inputs with the validation errors
  function showFirstError(form, errors) {
    var inputs = form.querySelectorAll("input[name], select[name]");
    var isShowing = false;
    for (var i = 0; inputs.length; i++) {
      isShowing = showErrorsForInput(inputs[i], errors && errors[inputs[i].name]);
      if (isShowing) {
        break;
      }
    }
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group");
    // Find where the error messages will be insert into
    var messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      _.each(errors, (error) => {
        addError(messages, error);
      });
      return true;
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
      return false;
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".help-block.error"), function (el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the following
  function addError(messages, error) {

    var block = document.createElement("div");
    block.classList.add("help-block");
    block.classList.add("error");
    block.classList.add("input-block__message");
    block.innerText = error;
    messages.appendChild(block);
  }

  function success() {

    alert("Success!");
  }
});