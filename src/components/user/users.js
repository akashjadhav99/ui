import Wrapper from "../../layouts/wrapper";
import AllUsers from './allUsers'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import apiURI from "../../constants/server";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/logginSlice";
import Loader from "../loader/loader";

const Users = () => {
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
      const respons = await fetch(`${apiURI}/users${QueryString}`, {
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
      <Link to="/users/add" className="btn btn-sm btn-neutral">
        Add New User
      </Link>
    </>
  );

  const deleteRecord = async (e, query) => {
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/users/delete/${e}`, {
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
        breadCrum={["users", "all users"]}
        button={Showbutton}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AllUsers
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

export default Users;
