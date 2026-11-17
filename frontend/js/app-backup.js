const API_URL = "http://localhost:5000/api";

// Register accounts
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const role = document.getElementById("role").value;
        const message = document.getElementById("formMessage");

        const body = {
            fullName: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value
        };

        try {
            const response = await fetch(`${API_URL}/auth/register/${role}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            message.textContent = "Account created successfully! Please log in.";
            message.style.color = "green";
            registerForm.reset();
        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        }
    });
}

// Login accounts
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const message = document.getElementById("formMessage");

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value,
                    role: document.getElementById("role").value
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            localStorage.setItem("campusHostelToken", data.token);
            localStorage.setItem("campusHostelUser", JSON.stringify(data.user));

            message.textContent = "Login successful!";
            message.style.color = "green";
        } catch (error) {
            message.textContent = error.message;
            message.style.color = "red";
        }
    });
}

// Load hostel listings on homepage
async function loadHostels() {
    const container = document.getElementById("hostelResults");
    if (!container) return;

    container.innerHTML = "<p>No hostel listings are available yet. Please check again soon.</p>";
}

loadHostels();
