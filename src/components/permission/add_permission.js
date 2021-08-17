import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Wrapper from "../../layouts/wrapper";
import { logout } from "../../stores/logginSlice";
import apiURI from "../../constants/server";

const Addpermission = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);
  const permissionRef = useRef(null);
  const formSubmit = async (e) => {
    e.preventDefault();

    if (permissionRef.current.value.trim().length > 0) {
      const token = localStorage.getItem("User");
      setError(null);
      const respons = await fetch(`${apiURI}/permission/add`, {
        method: "POST",
        body: JSON.stringify({
          permission: permissionRef.current.value.trim(),
        }),
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
        localStorage.setItem("flash_message", JSON.stringify({type:'success',message:message}));
        history.push("/permissions");
      }
    } else {
      setError("this field is required");
    }
  };
  return (
    <>
      <Wrapper breadCrum={["permission", "add permissions"]} button={null}>
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0"> </h3>
              </div>
              <div className="col-8">
                <form id="form" className="text-left" onSubmit={formSubmit}>
                  <div className="form-group">
                    <label
                      for="example-text-input"
                      className="form-control-label"
                    >
                      Permission name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="permission"
                      id="example-text-input"
                      ref={permissionRef}
                    />
                    {error != null ? (
                      <span className="text-danger">{error}</span>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <button type="submit" class="btn btn-success">
                      Submit
                    </button>
                    <button type="reset" class="btn btn-danger">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Addpermission;
