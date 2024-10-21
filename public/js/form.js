// document.addEventListener("DOMContentLoaded", function() {

// // Step 1: Define variables
// const btnNext = document.querySelector('.next');
// const btnPrev = document.querySelector('.prev');
// const indicator = document.querySelector('.indicators .line span');
// const indicatorItems = document.querySelectorAll('.indicators p');
// const form = document.querySelector('.registerForm');
// const allTab = document.querySelectorAll('.tab');
// let i = 0;

// // Initialize the first tab
// allTab[i].classList.add('show');
// indicator.style.width = `${i * 50}%`;
// indicatorItems[i].classList.add('active');

// // Hide previous button if on first tab
// btnPrev.style.display = i === 0 ? 'none' : 'block';

// // Validation functions
// function validateFullName(studentName) {
//     const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
//     return regex.test(studentName);
// }

// function validateRegNo(regNo) {
//     const regex = /^\d{4}\/[a-zA-Z]{1,4}\/\d+$/;
//     return regex.test(regNo);
// }

// function validateEmail(studentEmail) {
//     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return regex.test(studentEmail);
// }

// function validatePhoneNumber(studentPhone_no) {
//     const regex = /^0[1-9]\d{9}$/;
//     return regex.test(studentPhone_no);
// }



// // Additional validation functions for sponsor fields
// function validateSponsorFullName(parentName) {
//     return validateFullName(parentName);  
// }

// function validateSponsorPhoneNumber(parentPhone_no) {
//     return validatePhoneNumber(parentPhone_no);  
// }

// function validateSponsorEmail(parentEmail) {
//     return validateEmail(parentEmail);  
// }

// // Event listener for the "Next" button
// btnNext.addEventListener('click', function () {
//     // Perform validation for the current tab
//     let valid = false;
//     if (i === 0) {
//         // Validate Student Information tab
//         const studentName = document.getElementById('studentName').value;
//         const regNo = document.getElementById('regNo') ? document.getElementById('regNo').value : '';
//         const studentPhone_no = document.getElementById('studentPhone_no').value;
//         const studentEmail = document.getElementById('studentEmail').value;

//         valid = validateFullName(studentName) &&
//                 validateRegNo(regNo) &&
//                 validatePhoneNumber(studentPhone_no) &&
//                 validateEmail(studentEmail) &&
//                 document.getElementById('gender').value !== "";

//     } else if (i === 1) {
//         // Validate Academic Information tab
//         const faculty = document.getElementById('faculty').value;
//         const dept = document.getElementById('dept').value;
//         const level = document.getElementById('level').value;

//         valid = faculty && dept && level;

//     } else if (i === 2) {
//         // Validate Parent Information tab
//         const parentName = document.getElementById('parentName').value;
//         const parentEmail = document.getElementById('parentEmail').value;
//         const parentPhone_no = document.getElementById('parentPhone_no').value;
//         const parentGender = document.getElementById('parentGender').value;

//         valid = validateSponsorFullName(parentName) &&
//                 validateSponsorEmail(parentEmail) &&
//                 validateSponsorPhoneNumber(parentPhone_no) &&
//                 parentGender;
//     }

//     if (valid) {
//         // If it's the last tab, submit the form data to the backend
//         if (i === allTab.length - 1) {
//             // const formData = new FormData(form); 
//                 const data = {
//             studentName: document.getElementById('studentName').value,
//             regNo: document.getElementById('regNo').value,
//             studentPhone_no: document.getElementById('studentPhone_no').value,
//             studentEmail: document.getElementById('studentEmail').value,
//             gender: document.getElementById('gender').value,
//             faculty: document.getElementById('faculty').value,
//             dept: document.getElementById('dept').value,
//             level: document.getElementById('level').value,
//             parentName: document.getElementById('parentName').value,
//             parentEmail: document.getElementById('parentEmail').value,
//             parentPhone_no: document.getElementById('parentPhone_no').value,
//             parentGender: document.getElementById('parentGender').value
//         };
//             console.log(data);
//             // formData.forEach((value, key) => {
//                 // data[key] = value;
//             };
            
            

//             fetch('/register', {
//                 method: 'POST', // *GET, POST, PUT, DELETE, etc.
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             })
//             .then(res => res.json())
//               .then((data) => {
//                   if (data.success) {
//                       $(document).ready(() => {
//                           iziToast.success({
//                               title: 'Ok',
//                               message: data.msg,
//                           });
//                       });
           
//                       setInterval(() => {
//                           window.location.href = data.redirectURL;
//                       }, 2000);
//                   }
//                   if (data.error) {
//                       // Invoke the toast component
//                       $(document).ready(() => {
//                           iziToast.error({
//                               title: 'Error',
//                               message: data.error,
//                           });
//                       });
//                   }
//               })
//               .catch(e => {
//                   console.log(e)
//               })
//         } else {
//             // Move to the next tab
//             i++;
//             allTab.forEach(tab => tab.classList.remove('show'));
//             allTab[i].classList.add('show');
//             indicator.style.width = `${i * 50}%`;
//             indicatorItems.forEach((item, index) => {
//                 item.classList.toggle('active', index === i);
//             });

//             // Change the button text to "Submit" on the last tab
//             btnNext.textContent = i === allTab.length - 1 ? 'Submit' : 'Next';
//         }
    
// });

// // Event listener for the "Previous" button
// btnPrev.addEventListener('click', function () {
//     i--;
//     allTab.forEach(tab => tab.classList.remove('show'));
//     allTab[i].classList.add('show');
//     indicator.style.width = `${i * 50}%`;
//     indicatorItems.forEach((item, index) => {
//         item.classList.toggle('active', index === i);
//     });

//     // Update button text based on the current tab
//     btnNext.textContent = i === allTab.length - 1 ? 'Submit' : 'Next';
//     btnPrev.style.display = i === 0 ? 'none' : 'inline-block';
// });
// });
document.addEventListener("DOMContentLoaded", function() {
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    const indicator = document.querySelector('.indicators .line span');
    const indicatorItems = document.querySelectorAll('.indicators p');
    const form = document.querySelector('.registerForm');
    const allTab = document.querySelectorAll('.tab');
    let i = 0;

    // Initialize the first tab
    allTab[i].classList.add('show');
    indicator.style.width = `${i * 50}%`;
    indicatorItems[i].classList.add('active');
    btnPrev.style.display = 'none'; // Hide previous button initially

    // Validation functions
    function validateFullName(studentName) {
        const regex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        return regex.test(studentName);
    }

    function validateRegNo(regNo) {
        const regex = /^\d{4}\/[a-zA-Z]{1,4}\/\d+$/;
        return regex.test(regNo);
    }

    function validateEmail(studentEmail) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(studentEmail);
    }

    function validatePhoneNumber(studentPhone_no) {
        const regex = /^0[1-9]\d{9}$/;
        return regex.test(studentPhone_no);
    }

    function validateSponsorFullName(parentName) {
        return validateFullName(parentName);  
    }

    function validateSponsorPhoneNumber(parentPhone_no) {
        return validatePhoneNumber(parentPhone_no);  
    }

    function validateSponsorEmail(parentEmail) {
        return validateEmail(parentEmail);  
    }

    // Event listener for the "Next" button
    btnNext.addEventListener('click', function () {
        let valid = false;

        if (i === 0) {
            const studentName = document.getElementById('studentName').value;
            const regNo = document.getElementById('regNo') ? document.getElementById('regNo').value : '';
            const studentPhone_no = document.getElementById('studentPhone_no').value;
            const studentEmail = document.getElementById('studentEmail').value;

            valid = validateFullName(studentName) &&
                    validateRegNo(regNo) &&
                    validatePhoneNumber(studentPhone_no) &&
                    validateEmail(studentEmail) &&
                    document.getElementById('gender').value !== "";
        } else if (i === 1) {
            const faculty = document.getElementById('faculty').value;
            const dept = document.getElementById('dept').value;
            const level = document.getElementById('level').value;

            valid = faculty && dept && level;
        } else if (i === 2) {
            const parentName = document.getElementById('parentName').value;
            const parentEmail = document.getElementById('parentEmail').value;
            const parentPhone_no = document.getElementById('parentPhone_no').value;
            const parentGender = document.getElementById('parentGender').value;

            valid = validateSponsorFullName(parentName) &&
                    validateSponsorEmail(parentEmail) &&
                    validateSponsorPhoneNumber(parentPhone_no) &&
                    parentGender;
        }

        if (valid) {
            // Move to the next tab only if validation passes
            if (i === allTab.length - 1) {
                const data = {
                    studentName: document.getElementById('studentName').value,
                    regNo: document.getElementById('regNo').value,
                    studentPhone_no: document.getElementById('studentPhone_no').value,
                    studentEmail: document.getElementById('studentEmail').value,
                    gender: document.getElementById('gender').value,
                    faculty: document.getElementById('faculty').value,
                    dept: document.getElementById('dept').value,
                    level: document.getElementById('level').value,
                    parentName: document.getElementById('parentName').value,
                    parentEmail: document.getElementById('parentEmail').value,
                    parentPhone_no: document.getElementById('parentPhone_no').value,
                    parentGender: document.getElementById('parentGender').value
                };
                console.log(data);
                fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then((data) => {
                    if (data.success) {
                        iziToast.success({ title: 'Ok', message: data.msg });
                        setInterval(() => window.location.href = data.redirectURL, 2000);
                    } else {
                        iziToast.error({ title: 'Error', message: data.error });
                    }
                })
                .catch(e => console.log(e));
            } else {
                i++;
                allTab.forEach(tab => tab.classList.remove('show'));
                allTab[i].classList.add('show');
                indicator.style.width = `${i * 50}%`;
                indicatorItems.forEach((item, index) => {
                    item.classList.toggle('active', index === i);
                });
                btnNext.textContent = i === allTab.length - 1 ? 'Submit' : 'Next';
                btnPrev.style.display = i === 0 ? 'none' : 'inline-block';
            }
        } else {
            alert('Please fill in all required fields correctly before proceeding.');
        }
    });

    // Event listener for the "Previous" button
    btnPrev.addEventListener('click', function () {
        if (i > 0) {
            i--;
            allTab.forEach(tab => tab.classList.remove('show'));
            allTab[i].classList.add('show');
            indicator.style.width = `${i * 50}%`;
            indicatorItems.forEach((item, index) => {
                item.classList.toggle('active', index === i);
            });
            btnNext.textContent = i === allTab.length - 1 ? 'Submit' : 'Next';
            btnPrev.style.display = i === 0 ? 'none' : 'inline-block';
        }
    });
});
