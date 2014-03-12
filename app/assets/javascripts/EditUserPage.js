function editUserPageLoad() {
  if (document.getElementById("currentPasswordEdit") != null) {
    if ($("#currentPasswordEdit").val() == "") {
      document.getElementById("updateProfBtn").disabled = true;
    }
    $("#currentPasswordEdit").bind("propertychange keyup input paste", function() {
      if ($("#currentPasswordEdit").val() == "") {
        document.getElementById("updateProfBtn").disabled = true;
      } else {
        document.getElementById("updateProfBtn").disabled = false;
      }
    });
  }
}

$(document).on("page:load", editUserPageLoad);
$(document).ready(editUserPageLoad);

