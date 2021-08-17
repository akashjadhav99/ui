import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import apiURI from "../constants/server";
import axios from "axios";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const handleRegister = async () => {
    setIsloading(true);
    const postData = {
      name: name,
      mobile: mobile,
      email: email,
      password: password,
    };
    const url = apiURI + `/admin/register`;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios.post(url, postData, config);
   
    if (response.status === 201) {
      setIsloading(false);
      setName('');
      setMobile('');
      setEmail('');
      setPassword('');
      setSuccessMsg(response.data.successMsg);
      setTimeout(function () {
        history.push({
          pathname: "/login",
          state: {
            response: "messageFromServer",
          },
        });
      }, 1000);
    } else {
      setIsloading(false);
      setErrMsg(response.data.errMsg);
    }
    
  };
  
  return (
    <Fragment>
      <div className="main-content">
        <div className="header bg-gradient-primary py-7 py-lg-8 ">
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
              <div className="col-lg-6 col-md-8">
                <div className="card bg-secondary border-0">
                  <div className="card-body px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                      <strong>Sign Up</strong>
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
                          <span aria-hidden="true">&times;</span>
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
                        <strong>Congratulations!</strong> {successMsg}
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
                      <div className="form-group">
                        <div className="input-group input-group-merge input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ni ni-hat-3"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Class / Personal Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-merge input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ni ni-mobile-button"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="mobile"
                            type="text"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group input-group-merge input-group-alternative mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="ni ni-email-83"></i>
                            </span>
                          </div>
                          <input
                            className="form-control"
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                          />
                        </div>
                      </div>
                      <div className="text-muted font-italic">
                        <small>
                          password strength:{" "}
                          <span className="text-success font-weight-700">
                            strong
                          </span>
                        </small>
                      </div>
                      <div className="row my-4">
                        <div className="col-12">
                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="customCheckRegister"
                              type="checkbox"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheckRegister"
                            >
                              <span className="text-muted">
                                I agree with the <a href="#!">Privacy Policy</a>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handleRegister}
                          type="button"
                          disabled={isLoading}
                          className="btn btn-primary mt-4"
                        >
                          {isLoading ? "Please wait..." : "Create account"}
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
                    <small className="text-light">
                      Already have a account?
                      <Link to="/login" className="text-light">
                        <strong> Sign In </strong>
                      </Link>
                    </small>
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
export default Register;
