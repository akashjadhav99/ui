import Wrapper from "../layouts/wrapper";
import { Link } from "react-router-dom";

const Error_404 = () => {
  const Showbutton = (
    <>
     
     
    </>
  );
  return (
    <>
      <Wrapper breadCrum={["error", "404"]} button={Showbutton}>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header border-0">
              <h3 className="mb-0">404</h3>
            </div>
            </div>
            </div>
            </div>
      </Wrapper>
    </>
  );
};

export default Error_404;
