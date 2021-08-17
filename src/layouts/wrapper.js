import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { checkloggin } from "../stores/logginSlice";
import { logout } from "../stores/logginSlice";
import apiURI from "../constants/server"
import { checkPermission } from "../stores/permissionSlice";


const Wrapper = (props) => {
  const checkLogin = useSelector((state) => state.login.is_Loggin);
  const checkparam = useSelector((state) => state.permisson.permissions);
 
  const checkUsername = useSelector((state) => state.login.userName);
  const dispatch = useDispatch();
  const setbreadCrum = props.breadCrum ? props.breadCrum : ["dashboard"];
  const history = useHistory();

 
  const checkPermissions = async () => {
   
    const token = localStorage.getItem("User");

    try {
      const respons = await fetch(`${apiURI}/user/checkPerms`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).token}`,
        },
      });

      if(respons.status === 200)
      {
        const { data   } = await respons.json();
        dispatch(checkPermission({per:data}))
      
      }
      if (respons.status === 401 || respons.status === 500) {
        dispatch(logout());
        history.push("/login");
      }
      
     

    } catch {}
  };
  useEffect(() => {
    const checkToken = localStorage.getItem("User");

    if (checkToken === null) {
      dispatch(checkloggin());
      if (!checkLogin) {
        history.push("/login");
      }
    }
    
  }, []);
  if(checkparam.length <= 0)
  {
    checkPermissions()
  }
  return (
    <>
      <div className="App">
        <Sidebar permission = {checkparam}/>
        <div className="main-content" id="panel">
          <Navbar username={checkUsername} />
          <Header breadCrum={setbreadCrum} button={props.button} />
          <div className="container-fluid mt--7 ">
            {props.children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
