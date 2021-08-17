import Wrapper from "../../layouts/wrapper";
import AllStudents from "./all_students";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import apiURI from "../../constants/server";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/logginSlice";
import Loader from "../loader/loader";

const Students = () => {
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
      const respons = await fetch(`${apiURI}/students${QueryString}`, {
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
     
    </>
  );

   
  return (
    <>
      <Wrapper
        breadCrum={["students", "all students"]}
        button={Showbutton}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <AllStudents
            list={dataList}
            count={dataCount}
            searchhandleer={searchHandller}
           
          />
        )}
      </Wrapper>
    </>
  );
};

export default Students;
