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


