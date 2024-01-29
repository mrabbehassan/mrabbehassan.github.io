(function () {
    'use strict';

    const form = document.getElementById('form');
    const submitButton = document.getElementById("submit");
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const messageStatus = document.getElementById("messageStatus");
    const MessageBody = document.getElementById("MessageBody");
    const PulseBtn = document.getElementById("PulseBtn");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        submitButton.disabled = true;
        setTimeout(() => { submitButton.disabled = false; }, 5000);

        const formData = new FormData(form);
        const data = {
            fullname: `${formData.get('fname')} ${formData.get('lname')}`,
            email: formData.get('email'),
            password: formData.get('password'),
            businessname: formData.get('businessname'),
            website: formData.get('website'),
            telegram: formData.get('telegram'),
            type: formData.get('type')
        };

        console.log(JSON.stringify(data));

        try {
            const res = await fetch(
                'https://vendor.4xpay.com/admin/request/singup',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Authorization': 'WXP1706522174B71D77F90D8CA2248C04FD',
                        'Content-Type': 'application/json'
                    }
                },
            );

            if (res.ok && res.body) {
                const resData = await res.json();
                console.log(resData);
                showModal(resData.status == "success" ? "Congratulation!" : "Sorry!", resData.status == "success" ? "green" : "orange", resData.status == "success" ? "Registration successfully." : "Registration failed.", resData.status == "success" ? "flex" : "none");
            } else {
                showModal("Sorry!", "orange", "Something went wrong! Contact with the admin.", "none");
            }
        } catch (err) {
            showModal("Sorry!", "orange", "Something went wrong! Contact with the admin.", "none");
        }
    });

    function showModal(status, color, message, display) {
        messageStatus.style.color = color;
        messageStatus.innerText = status;
        MessageBody.innerText = message;
        PulseBtn.style.display = display;

        confirmationModal.show();
        setTimeout(() => { confirmationModal.hide(); }, 10000);
    };
})();
