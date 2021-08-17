import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import Wrapper from "../../layouts/wrapper";
import { logout } from "../../stores/logginSlice";
import apiURI from "../../constants/server";
import RowLoader from "../loader/rawLoader";

const AddPermission = () => {
  const { id } = useParams();
  const [permission, setpermission] = useState([]);
  const [isLoading, setisloading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const [existingPer, setExistingPer] = useState([]);
  const inputRef = useRef(null);
  const [rolePermission, setRolePermission] = useState([]);
  const [CurrentRole, setCurrentRole] = useState(null);
  const getPermissions = async () => {
    // setisloading(true);
    const token = localStorage.getItem("User");

    try {
      const roleresponse = await fetch(`${apiURI}/role/getRole/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });

      const respons = await fetch(
        `${apiURI}/permissions?start=0&end=1000&search=null`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        }
      );

      if (respons.status === 401 || roleresponse.status === 401) {
        dispatch(logout());
        history.push("/login");
      }
      if (respons.status === 500 || roleresponse.status === 500) {
        history.push("/error");
      }
      if (respons.status === 200 || roleresponse.status === 200) {
        const { data } = await respons.json();
        const roleData = await roleresponse.json();
        setRolePermission(JSON.parse(roleData.data.permission));
        setExistingPer(JSON.parse(roleData.data.permission));
        setCurrentRole(roleData.data.name);
        setisloading(false);
        setpermission(data);
      }
    } catch (error) {
      history.push("/error");
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const formSubmit = async (e) => {
    e.preventDefault();
    if (rolePermission.length <= 0) {
      alert("Please select permissions");
      return false;
    }

    const token = localStorage.getItem("User");

    const respons = await fetch(`${apiURI}/role/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        permission: rolePermission,
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
      localStorage.setItem(
        "flash_message",
        JSON.stringify({ type: "success", message: message })
      );
      history.push("/roles");
    }
  };

  const checkPerm = (name, e) => {
    const perm = name.trim();
    let allPermis = rolePermission;
    const ind = allPermis.findIndex((i) => i == perm);

    if (e.target.checked) {
      if (ind == -1) {
        allPermis.push(perm);
        setRolePermission(allPermis);
      }
    } else {
      if (ind == 0) {
        allPermis.shift();
        setRolePermission(allPermis);
      } else {
        const perms = allPermis.splice(1, ind);
        setRolePermission(allPermis);
      }
    }
    //
  };
  let list = null;
  if (permission.length > 0) {
    list = permission.map((i) => {
      const currentper = i.name.toLowerCase();
      const is_exist = existingPer.findIndex((i) => i == currentper);

      return (
        <li key={i.id}>
          <input
            type="checkbox"
            defaultChecked={is_exist != -1 ? true : false}
            onChange={(e) => {
              checkPerm(i.name, e);
            }}
          />

          {i.name}
        </li>
      );
    });
  }
  return (
    <>
      <Wrapper breadCrum={["Roles", "add permission"]} button={null}>
        <div className="row">
          <div className="col">
            <div className="card shadow">
              <div className="card-header border-0">
                <h3 className="mb-0"> </h3>
              </div>
              <div className="col-8">
                <form id="form" className="text-left" onSubmit={formSubmit}>
                  <h3>
                    Set permissions from role{" "}
                    {CurrentRole != null
                      ? CurrentRole[0].toUpperCase() + CurrentRole.slice(1)
                      : null}
                  </h3>
                  <label
                    for="example-text-input"
                    className="form-control-label"
                  >
                    Permissions
                  </label>
                  <div className="form-group permissionBox">
                    {isLoading ? <RowLoader /> : list}
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={permission.length > 0 ? false : true}
                    >
                      Submit
                    </button>
                    <button type="reset" className="btn btn-danger">
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

export default AddPermission;
