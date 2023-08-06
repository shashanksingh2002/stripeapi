const loginForm = document.querySelector('.loginform');
const loginMessage = document.querySelector('.loginmessage');

loginForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const data = {
        email: loginForm.elements.email.value,
        password: loginForm.elements.password.value
    };
    fetch('/api/login',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if(result.emailFlag || result.passwordFlag){
            loginMessage.innerHTML = result.Message;
        }
        else{
            window.location.href = 'https://stripe-0w1q.onrender.com/subscription';
        }
    })
    .catch(err => console.error(err))
});