import Wrapper from "../../layouts/wrapper";
import AllPermission from "./all_permission";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import apiURI from "../../constants/server";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/logginSlice";
import Loader from "../loader/loader";

const Permissions = () => {
  const [permission, setpermission] = useState([]);
  const [isLoading, setisloading] = useState(true);
  const history = useHistory();
  const [dataCount, setDatacount] = useState(0);
  const [QueryString, setQueryString] = useState("?start=0&end=0&search=null");
  const dispatch = useDispatch();

  const getPermissions = async () => {
    // setisloading(true);
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/permissions${QueryString}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });

      if (respons.status === 401) {
        dispatch(logout());
        history.push("/login");
      }
      if (respons.status === 500) {
        history.push("/error");
      }
      if (respons.status === 200) {
        const { data, count } = await respons.json();
      
        setisloading(false);
        setpermission(data);
        setDatacount(count);
      }
    } catch (error) {
      history.push("/error");
    }
  };

  useEffect(() => {
    getPermissions();
  }, [QueryString]);

  const searchHandller = (e) => {
    setQueryString(e);
  };

  const Showbutton = (
    <>
      <Link to="/permissions/add" className="btn btn-sm btn-neutral">
        Add New Permission
      </Link>
    </>
  );

  const deleteRecord = async (e, query) => {
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/permission/delete/${e}`, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${JSON.parse(token).token}`,
        },
      });

      if (respons.status === 401) {
        dispatch(logout());
        history.push("/login");
      }
      if (respons.status === 500) {
        history.push("/error");
      }
      if (respons.status === 200) {
        const   data   = await respons.json();
       
        setQueryString(query);
        getPermissions();
        
      }
    } catch (error) {
      history.push("/error");
    }
  };
  return (
    <>
      <Wrapper
        breadCrum={["permission", "all permissions"]}
        button={Showbutton}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AllPermission
            list={permission}
            count={dataCount}
            searchhandleer={searchHandller}
            deleteRecord={deleteRecord}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Permissions;
