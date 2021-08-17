import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Wrapper from "../../layouts/wrapper";
import { logout } from "../../stores/logginSlice";
import apiURI from "../../constants/server"; 

const AddRole = () => { 
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
 
   
  const formSubmit = async (e) => {
    e.preventDefault();
   
    if (inputRef.current.value.trim().length > 0) {
      const token = localStorage.getItem("User");
      setError(null);
      const respons = await fetch(`${apiURI}/role/add`, {
        method: "POST",
        body: JSON.stringify({
          role: inputRef.current.value.trim(),
          
        }),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(token).token}`,
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
        history.push("/roles");
      }
    } else {
      setError("this field is required");
    }
  };

  
  return (
    <>
      <Wrapper breadCrum={["Roles", "add roles"]} button={null}>
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
                      Role name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Admin,Supperadmin"
                      id="example-text-input"
                      ref={inputRef}
                    />
                    {error != null ? (
                      <span className="text-danger">{error}</span>
                    ) : null}
                  </div>
                 
                  <div className="form-group">
                    <button
                      type="submit"
                      class="btn btn-success"
                      
                    >
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

export default AddRole;
