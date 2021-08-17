import Wrapper from "../../layouts/wrapper";
import AllRoles from "./AllRoles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import apiURI from "../../constants/server";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/logginSlice";
import Loader from "../loader/loader";

const Roles = () => {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setisloading] = useState(true);
  const history = useHistory();
  const [dataCount, setDatacount] = useState(0);
  const [QueryString, setQueryString] = useState("?start=0&end=10&search=null");
  const dispatch = useDispatch();

  const fetchData = async () => {
    // setisloading(true);
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/roles${QueryString}`, {
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
        setDataList(data);
        setDatacount(count);
      }
    } catch (error) {
      history.push("/error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [QueryString]);

  const searchHandller = (e) => {
    setQueryString(e);
  };

  const Showbutton = (
    <>
      <Link to="/roles/add" className="btn btn-sm btn-neutral">
        Add New Role
      </Link>
    </>
  );

  const deleteRecord = async (e, query) => {
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/role/delete/${e}`, {
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
        fetchData();
        
      }
    } catch (error) {
      history.push("/error");
    }
  };
  return (
    <>
      <Wrapper
        breadCrum={["roles", "all roles"]}
        button={Showbutton}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AllRoles
            list={dataList}
            count={dataCount}
            searchhandleer={searchHandller}
            deleteRecord={deleteRecord}
          />
        )}
      </Wrapper>
    </>
  );
};

export default Roles;
