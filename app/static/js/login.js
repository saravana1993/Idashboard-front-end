// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("login-form");
  
//     form.addEventListener("submit", function (e) {
//       const email = form.email.value.trim();
//       const password = form.password.value.trim();
  
//       if (!email || !password) {
//         alert("Both email and password are required.");
//         e.preventDefault();
//         return;
//       }
  
//       const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//       if (!emailPattern.test(email)) {
//         alert("Invalid email format.");
//         e.preventDefault();
//       }
      
//     });
//   });

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const btn = document.getElementById("login-button");
  
    if (!form || !btn) return;
  
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // ✅ Client-side validation
      if (!email || !password) {
        alert("Both email and password are required.");
        return;
      }
  
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("Invalid email format.");
        return;
      }
  
      if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
  
      // ✅ Send login request to Flask
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          alert("✅ Login successful!");
          // Redirect to dashboard or home
          localStorage.setItem('session_id', data.session_id);
          localStorage.setItem('user_id', data.user_id);
          window.location.href = "/dashboard";
        } else {
          alert("❌ " + (data.message || "Login failed"));
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("❌ Server error. Try again later.");
      }


    });
  });
  