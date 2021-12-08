import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

let userInfo = {};
const cookie = new Cookies();

function login() {
  Swal.fire({
    title: "Login Form",
    html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
        <input type="password" id="password" class="swal2-input" placeholder="Password">
        <br><small 
        onmouseover="this.style.cursor='pointer'; this.style.textDecoration='underline';"
        onmouseout="this.style.textDecoration='none';"
        id="signup"
        >signup</small>`,
    confirmButtonText: "Sign in",
    focusConfirm: false,
    preConfirm: async () => {
      const username = Swal.getPopup().querySelector("#login").value;
      const password = Swal.getPopup().querySelector("#password").value;
      if (!username || !password) {
        Swal.showValidationMessage(`Please enter login and password`);
      }
      Swal.showLoading();
      let response = await axios.get(`/get-user/${username}`);
      let res = response.data;

      if (res.success) {
        if (res.user[0].password == password) {
          cookie.set(
            "session",
            JSON.stringify({ name: res.user[0].firstname }),
            {
              path: "/",
            }
          );
        }
      } else {
        Swal.hideLoading();
        Swal.showValidationMessage(`Username or Password is incorrect`);
      }
    },
  });
  document
    .getElementById("signup")
    .addEventListener("click", () => registration());
}

async function registration() {
  const steps = ["1", "2", "3"];
  const swalQueue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: "Next >",
  });

  await swalQueue
    .fire({
      title: "Registration Form",
      currentProgressStep: 0,
      html: `<input type="text" id="fname" class="swal2-input" placeholder="First Name">
           <input type="text" id="lname" class="swal2-input" placeholder="Last Name">
           <input type="text" id="email" class="swal2-input" placeholder="Email">
           <br>
           <small 
           onmouseover="this.style.cursor='pointer'; this.style.textDecoration='underline';"
           onmouseout="this.style.textDecoration='none';"
           id="auth"
           >login</small>`,
      preConfirm: () => {
        const fname = Swal.getPopup().querySelector("#fname").value;
        const lname = Swal.getPopup().querySelector("#lname").value;
        const email = Swal.getPopup().querySelector("#email").value;
        if (!fname || !lname || !email) {
          Swal.showValidationMessage(`Please enter name and email`);
        }
        return { fname, lname, email };
      },
    })
    .then((res) => {
      if (res.isConfirmed) {
        const fname = res.value.fname,
          lname = res.value.lname,
          email = res.value.email;
        swalQueue
          .fire({
            currentProgressStep: 1,
            showCancelButton: true,
            reverseButtons: true,
            html: `<input type="text" id="username" class="swal2-input" placeholder="Username">
           <br>
           <input type="checkbox" id="cb1" /> User <input type="checkbox" id="cb2" /> Admin
           <br>
           <input type="password" id="pass1" class="swal2-input" placeholder="Password">
           <input type="password" id="pass2" class="swal2-input" placeholder="Re-enter password">`,
            preConfirm: async () => {
              const username = Swal.getPopup().querySelector("#username").value;
              const pass1 = Swal.getPopup().querySelector("#pass1").value;
              const pass2 = Swal.getPopup().querySelector("#pass2").value;
              const cb1 = Swal.getPopup().querySelector("#cb1").checked;
              const cb2 = Swal.getPopup().querySelector("#cb2").checked;

              if (!username || !pass1 || !pass2 || (!cb1 && !cb2)) {
                Swal.showValidationMessage(
                  `Please enter username, password and check one of roles (User and/or Admin)`
                );
              } else if (pass1.length < 4 || pass2.length < 4) {
                Swal.showValidationMessage(
                  `Password should be greater than 4 characters`
                );
              } else if (pass1 != pass2) {
                Swal.showValidationMessage(`Password didn't match`);
              } else {
                let roles = [];
                if (cb1) roles.push("user");
                if (cb2) roles.push("admin");

                Swal.showLoading();
                let response = await axios.post("/add-user", {
                  fname,
                  lname,
                  email,
                  roles,
                  username,
                  pass1,
                });

                let res = response.data;

                if (res.success) {
                  cookie.set(
                    "session",
                    JSON.stringify({ name: res.firstname }),
                    {
                      path: "/",
                    }
                  );
                } else alert(res.message);
                return { res };
              }
            },
          })
          .then((res) => {
            if (res.value.res.success) {
              swalQueue.fire({
                title: "Account is successfully created",
                icon: "success",
                currentProgressStep: 2,
                confirmButtonText: "close",
              });
            } else {
              Swal.close();
              registration();
            }
          });
      }
    });
  //document.getElementById("auth").addEventListener("click", () => login());
}

function NavBar() {
  const [name, setName] = useState(null);
  useEffect(() => {
    if (cookie.get("session") !== undefined)
      setName(cookie.get("session").name);
    else setName("LOG IN");
  }, [name]);
  return (
    <nav className="header">
      <img width="50" height="50" src="https://picsum.photos/50" alt="logo" />
      <div>
        <input type="text" />
        <button className="searchBtn">Search</button>
        <button className="QrBtn">QR</button>
      </div>
      <div>
        <FontAwesomeIcon icon={faUser} />
        <span
          className="user-name"
          onClick={() => {
            if (cookie.get("session") !== undefined) {
              //nothing as of now
            } else login();
          }}
        >
          {name}
        </span>
        {name != "LOG IN" && (
          <span
            className="logout"
            onClick={() => {
              cookie.remove("session");
              setName(null);
            }}
          >
            LOGOUT
          </span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
