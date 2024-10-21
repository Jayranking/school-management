// Registration Form Validation
const memoForm = document.getElementById("memoForm");

memoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Getting Error Div
  const memoTitleErr = document.querySelector(".memoTitleErr");
  const memoRefErr = document.querySelector(".memoRefErr");
  const memoBodyErr = document.querySelector(".memoBodyErr");
  
  // Returning All the Errors
  memoTitleErr.innerHTML = "";
  memoRefErr.innerHTML = "";
  memoBodyErr.innerHTML = "";
  

  // Getting all the value from our inputs
  const memoTitle = memoForm.memoTitle.value;
  const memoRef = memoForm.memoRef.value;
  const memoBody = memoForm.memoBody.value;


  // Applying Regex For the VAlidation
  const memoTitleReg = /^[a-zA-Z0-9\s.,-]{3,100}$/;
  const memoRefReg = /^[\w\s.,!?'"@#$%^&*()_\-+=:;<>]{10,1000}$/;


  // Writing The Validation Logic Using Statement
  if (!memoTitleReg.test(memoTitle)) {
    memoTitleErr.innerHTML = "Invalid text format input";
    return;
  }

  if (!memoRefReg.test(memoRef)) {
    memoRefErr.innerHTML = "Invalid text format input";
    return;
  }

  if (memoBody == '') {
    memoBodyErr.innerHTML = "Invalid text format input";
    return;
  }



  const data = {memoTitle, memoRef, memoBody};

  fetch("/post-memo", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        $(document).ready(() => {
          iziToast.success({
            title: "Ok",
            message: data.msg,
          });
        });

        setInterval(() => {
          window.location.href = data.redirectURL;
        }, 2000);
      }
      if (data.error) {
        // Invoke the toast component
        $(document).ready(() => {
          iziToast.error({
            title: "Error",
            message: data.error,
          });
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});
