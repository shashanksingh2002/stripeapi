document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const screen1 = document.querySelector('.screen1');
    const screen2 = document.querySelector('.screen2');
    const subscriptionFormMonth = document.querySelector('.subscriptionMonth');
    const subscriptionFormYear = document.querySelector('.subscriptionYear');
    
    screen1.style.display = 'block';
    screen2.style.display = 'none';

    const getSubscription = (type) => {
        const data = {
            "plan": type
        };

        fetch('/api/subscription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.data[0].subscriptions.forEach(plan => {
                html += `<div class="plan">
                            <h2>${plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1)}</h2>
                            <p class="price">$${(plan.price)}</p>
                            <p>Video Quality: ${plan['video-quality']}</p>
                            <p>Resolution: ${plan.resolution}</p>
                            <p>Devices: ${plan.devices.join(', ')}</p>
                            <button class="checkout-button" data-plan="${[plan.price,plan.plan,type]}">Checkout</button>
                        </div>`;
            });

            if (type === 'monthly') {
                subscriptionFormMonth.innerHTML = html;
            } else {
                subscriptionFormYear.innerHTML = html;
            }

            // Attach event listeners to the checkout buttons after adding content
            const checkoutButtons = document.querySelectorAll('.checkout-button');
            checkoutButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent form submission
                    const selectedPlan = button.getAttribute('data-plan');
                    const stringToArray = selectedPlan.split(',');
                    const planData = {
                        price: Number(stringToArray[0]),
                        plan: stringToArray[1],
                        type: stringToArray[2]
                    }
                     fetch('/api/checkout',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(planData)
                    })
                    .then(response =>{
                        if(response.ok){
                            return response.json();
                        }
                    })
                    .then(data => {
                        window.location.href = data.url;
                    })
                    .catch(err => console.error(err))
                });
            });
        })
        .catch(err => console.error(err));
    };

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            screen1.style.display = 'none';
            screen2.style.display = 'block';
            getSubscription('yearly');
        } else {
            screen1.style.display = 'block';
            screen2.style.display = 'none';
            getSubscription('monthly');
        }
    });

    getSubscription('monthly');
});
