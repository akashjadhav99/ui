import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import apiURI from "../constants/server";
import { useDispatch, useSelector } from "react-redux";
import { checkloggin } from "../stores/logginSlice";
import { checkPermission } from "../stores/permissionSlice";

function Login() {
   
  const checkLogin = useSelector((state) => state.login.is_Loggin);
  const checkUsername = useSelector((state) => state.login.userName);

  const dispatch = useDispatch();

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);
  
  if (checkLogin) {
    history.push({
      pathname: "/",
    });
  }

  useEffect(()=>{
    dispatch(checkloggin());
  },[])
  const handleLogin = async () => {
    setIsloading(true);
    setErrMsg("");
    if (email.trim().length > 0 && password.trim().length > 0) {
      const postData = {
        username: email,
        password: password,
      };

      const response = await fetch(`${apiURI}/login`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data, message } = await response.json();
 
      if (response.status === 200) {
        setIsloading(false);
        setSuccessMsg(response.message);
        dispatch(checkPermission({per:data.permission}))
        localStorage.setItem("User", JSON.stringify({token :data.token,username:data.username,role:data.role}));
         
        dispatch(checkloggin());
        setTimeout(function () {
          history.push({
            pathname: "/",
          });
        }, 500);
      }
      if (response.status === 401) {
        setIsloading(false);
        setErrMsg("invalid username password");
      }
    } else {
      setErrMsg("invalid username password");
      setIsloading(false);
    }
  };
  return (
    <Fragment>
      <div className="main-content">
        <div
          style={{ height: "100vh" }}
          className="header bg-gradient-primary py-7 py-lg-8 pt-lg-9"
        >
          <div className="container"></div>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              x="0"
              y="0"
              viewBox="0 0 2560 100"
              preserveAspectRatio="none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container  pb-5">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-7">
                <div className="card bg-secondary border-0 mb-0">
                  <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <strong>Sign in</strong>
                    </div>
                    {errMsg != "" ? (
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Oops!</strong> {errMsg}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span
                            aria-hidden="true"
                            onClick={() => {
                              setErrMsg(false);
                            }}
                          >
                            &times;
                          </span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {successMsg != "" ? (
                      <div
                        className="alert alert-success alert-dismissible fade show"
                        role="alert"
                      >
                        <strong>Great!</strong> {successMsg}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    <form role="form">
                      <div className="form-group mb-3">
                        <div className="input-group input-group-merge input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ni ni-email-83"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Username"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-merge input-group-alternative">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ni ni-lock-circle-open"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id=" customCheckLogin"
                          type="checkbox"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor=" customCheckLogin"
                        >
                          <span className="text-muted">Remember me</span>
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handleLogin}
                          type="button"
                          disabled={isLoading}
                          className="btn btn-primary my-4"
                        >
                          {isLoading ? "Checking..." : "Sign in"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <a href="#" className="text-light">
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="col-6 text-right">
                    <Link to="/register" className="text-light">
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Login;
