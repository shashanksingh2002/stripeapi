<<<<<<< HEAD
const signupForm = document.querySelector('.signupform');
const signupMessage = document.querySelector('.signupmessage');

signupForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const data = {
        username: signupForm.elements.username.value,
        email: signupForm.elements.email.value,
        password: signupForm.elements.password.value
    };
    fetch('/api/signup',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.flag){
            window.location.href = 'https://stripe-0w1q.onrender.com/';
        }
        else{
            signupMessage.innerHTML = result.Message;
        }
    })
    .catch(err => console.error(err))
=======
const signupForm = document.querySelector('.signupform');
const signupMessage = document.querySelector('.signupmessage');

signupForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const data = {
        username: signupForm.elements.username.value,
        email: signupForm.elements.email.value,
        password: signupForm.elements.password.value
    };
    fetch('/api/signup',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.flag){
            window.location.href = 'https://stripe-0w1q.onrender.com/';
        }
        else{
            signupMessage.innerHTML = result.Message;
        }
    })
    .catch(err => console.error(err))
>>>>>>> 58affa397f2d73ae6f0e7255f1d9f373ec2a8a39
});