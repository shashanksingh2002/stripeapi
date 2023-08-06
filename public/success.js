<<<<<<< HEAD
const dataPlaceholder = document.querySelector('.transactiondata')
const refund = document.querySelector('.refund');
let id = null;
document.addEventListener('DOMContentLoaded',() => {
    fetch('/api/transaction',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        id = data.id;
        data.amount = Number(data.amount)/100;
        const html = `
            <p>Plan: ${data.plan}</p>
            <p>Type: ${data.type}</p>
            <p>Amount: ${data.amount}</p>
        `;
        dataPlaceholder.innerHTML = html;
    })
    .catch(err => console.error(err));
});

refund.addEventListener('click',() => {
    const data = {
        id:id
    }
    fetch('/api/refund',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        dataPlaceholder.innerHTML = `<p>Refund Initiated Successfully</p>`;
    })
    .catch(err => console.error(err));
});


=======
const dataPlaceholder = document.querySelector('.transactiondata')
const refund = document.querySelector('.refund');
let id = null;
document.addEventListener('DOMContentLoaded',() => {
    fetch('/api/transaction',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        id = data.id;
        const html = `
            <p>Plan: ${data.plan}</p>
            <p>Type: ${data.type}</p>
            <p>Amount: ${data.amount}</p>
        `;
        dataPlaceholder.innerHTML = html;
    })
    .catch(err => console.error(err));
});

refund.addEventListener('click',() => {
    const data = {
        id:id
    }
    fetch('/api/refund',{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        dataPlaceholder.innerHTML = `<p>Refund Initiated Successfully</p>`;
    })
    .catch(err => console.error(err));
});


>>>>>>> 58affa397f2d73ae6f0e7255f1d9f373ec2a8a39
