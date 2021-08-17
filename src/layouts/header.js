import React from "react";

function Header(props) {
  const breadcrum = props.breadCrum.map((i,k)=>{
    return   <li className="breadcrumb-item" key={k}><a href="#">{i[0].toUpperCase() + i.slice(1)}</a></li>
  })
  return (
    // <!-- Header -->
    <div className="header bg-primary pb-6">
      <div className="container-fluid">
        <div className="header-body">
          <div className="row align-items-center py-4">
            <div className="col-lg-6 col-7">
               
              <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                  <li className="breadcrumb-item"><a href="#"><i className="fas fa-home"></i></a></li>
                  <li className="breadcrumb-item"  ><a href="#">Dashboard</a></li>
                 {breadcrum}
                </ol>
              </nav>
            </div>
            <div className="col-lg-6 col-5 text-right">
              {props.button}
            </div>
          </div>
          {/* <!-- Card stats --> */}
         
        </div>
      </div>
    </div>
  );
}

export default Header;