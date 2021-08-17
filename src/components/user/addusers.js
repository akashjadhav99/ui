import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Wrapper from "../../layouts/wrapper";
import { logout } from "../../stores/logginSlice";
import apiURI from "../../constants/server";

const AddUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);
  const permissionRef = useRef(null);
  const [roles, setroles] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [username, setusername] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [password, setpassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");
  const [phone, setephone] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [status, setstatus] = useState("");
  const [statusError, setstatusError] = useState("");
  const [role, setrole] = useState("");
  const [roleError, setroleError] = useState("");
  const formSubmit = async (e) => {
    e.preventDefault();

    firstName.trim().length > 0
      ? setfirstNameError(false)
      : setfirstNameError("this field is required");
    lastName.trim().length > 0
      ? setLastNameError(false)
      : setLastNameError("this field is required");
    username.trim().length > 0
      ? setusernameError(false)
      : setusernameError("this field is required");
    password.trim().length > 6
      ? setpasswordError(false)
      : setpasswordError("password should be greter than 6 char");
    email.trim().length > 0 && email.trim().includes("@")
      ? setemailError(false)
      : setemailError("invalid email id ");
    role.trim().length > 0
      ? setroleError(false)
      : setroleError("this field is required ");
    status.trim().length > 0
      ? setstatusError(false)
      : setstatusError("this field is required ");
    phone.trim().length >= 10
      ? setphoneError(false)
      : setphoneError("invalid phone number ");
    console.log(
      firstNameError,
      lastNameError,
      usernameError,
      passwordError,
      emailError,
      statusError,
      roleError,
      phoneError
    );
    if (
      !firstNameError &&
      !lastNameError &&
      !usernameError &&
      !passwordError &&
      !emailError &&
      !statusError &&
      !roleError &&
      !phoneError
    ) {
      console.log("Asd");
      const data = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        email: email,
        role: role,
        status: status,
        phone: phone,
      };
      const token = localStorage.getItem("User");
      setError(null);
      const respons = await fetch(`${apiURI}/user/add`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });
     
        if (respons.status === 401) {
          dispatch(logout());
          history.push("/");
        }
        if (respons.status === 500) {
          history.push("/error");
        }
        if (respons.status === 201 || respons.status === 200) {
          const { message } = await respons.json();
          localStorage.setItem(
            "flash_message",
            JSON.stringify({ type: "success", message: message })
          );
          history.push("/users");
        }
    } else {
      return false;
    }
  };

  const fetchData = async () => {
    // setisloading(true);
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(
        `${apiURI}/roles?start=0&end=100&search=null`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        }
      );

      if (respons.status === 200) {
        const { data, count } = await respons.json();
        setroles(data);
      }
    } catch (error) {
      history.push("/error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  let rolesList = null;
  if (roles.length > 0) {
    rolesList = roles.map((i) => {
      return (
        <option value={i.id} key={i.id}>
          {i.name}
        </option>
      );
    });
  }
  return (
    <>
      <Wrapper breadCrum={["permission", "add permissions"]} button={null}>
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0"> </h3>
              </div>
              <div className="col-12 mb-5">
                <form
                  id="form"
                  className="text-left"
                  onSubmit={formSubmit}
                  noValidate
                >
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John"
                        required
                        value={firstName}
                        onChange={(e) => {
                          setfirstName(e.target.value);
                          setfirstNameError(false);
                        }}
                      />
                      {firstNameError != null ? (
                        <span className="text-danger">{firstNameError}</span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputPassword4">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sinha"
                        required
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          setLastNameError(false);
                        }}
                      />
                      {lastNameError != null ? (
                        <span className="text-danger">{lastNameError}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="John007"
                        required
                        value={username}
                        onChange={(e) => {
                          setusername(e.target.value);
                          setusernameError(false);
                        }}
                      />
                      {usernameError != null ? (
                        <span className="text-danger">{usernameError}</span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputPassword4">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value);
                          setpasswordError(false);
                        }}
                      />
                      {passwordError != null ? (
                        <span className="text-danger">{passwordError}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputAddress">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputAddress"
                        placeholder="John.sinha@wwe.com"
                        required
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value);
                          setemailError(false);
                        }}
                      />
                      {emailError != null ? (
                        <span className="text-danger">{emailError}</span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputAddress2">Phone</label>

                      <input
                        type="tel"
                        className="form-control"
                        id="inputAddress"
                        placeholder="9766******"
                        required
                        value={phone}
                        onChange={(e) => {
                          setephone(e.target.value);
                          setphoneError(false);
                        }}
                      />
                      {phoneError != null ? (
                        <span className="text-danger">{phoneError}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputAddress">Role</label>
                      <select
                        className="form-control"
                        required
                        onChange={(e) => {
                          setrole(e.target.value);
                          setroleError(false);
                        }}
                      >
                        <option value="">--</option>
                        {rolesList}
                      </select>
                      {roleError != null ? (
                        <span className="text-danger">{roleError}</span>
                      ) : null}
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputAddress2">Status</label>
                      <select
                        className="form-control"
                        required
                        onChange={(e) => {
                          setstatus(e.target.value);
                          setstatusError(false);
                        }}
                      >
                        <option value="">--</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>

                      {statusError != null ? (
                        <span className="text-danger">{statusError}</span>
                      ) : null}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default AddUser;
