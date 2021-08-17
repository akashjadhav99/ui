import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../App";
import Register from "../components/register";
import Login from "../components/login";
import Users from "../components/user/users";
import Add_user from "../components/user/addusers";
import Permissions from "../components/permission/permission";
import Error_404 from "../components/404";
import Error from "../components/error";
import Addpermission from "../components/permission/add_permission";
import Roles from "../components/role/roles";
import AddRole from "../components/role/addRole";
import AddPermission from "../components/role/permissions";
import Students from "../components/student/students";



function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/users" component={Users} />
        <Route path="/users/add" component={Add_user} />
        <Route exact path="/permissions" component={Permissions} />
        <Route path="/404" component={Error_404} />
        <Route path="/error" component={Error} />
        <Route exact path="/permissions/add" component={Addpermission} />
        <Route exact path="/roles" component={Roles} />
        <Route exact path="/roles/add" component={AddRole} />
        <Route exact path="/roles/permissions/:id" component={AddPermission} />
        <Route exact path="/students" component={Students} />
        
      </Switch>
    </Router>
  );
}
export default Routes;
