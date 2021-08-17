import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import RowLoader from "../loader/rawLoader";

const inisialState = {
  currentPage: 1,
  pageCount: 0,
  pages: [],
  queryString: { start: 0, end: 0, search: null },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "inisialState":
      return {
        ...state,
        pageCount: action.payload.pageCount,
        pages: action.payload.pages,
      };
      break;
    case "updatepage":
      return {
        ...state,
        currentPage: action.payload.currentPage,
        pages: action.payload.pages,
      };
      break;
    case "queryString":
      return {
        ...state,
        queryString: { start: action.payload.start, end: action.payload.end },
      };
      break;
    case "currentPage":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
      break;

    case "search":
      return {
        ...state,
        queryString: { start: 0, end: 0, search: action.payload.search },
      };
      break;
    default:
      return state;
      break;
  }
};

let debounceHandler = null;

const AllRoles = (props) => {
  const [state, dispatch] = useReducer(reducer, inisialState);
  const [error, setError] = useState(false);
  const [errorType, setErrorType] = useState("success");
  const [errorMessage, setErrorMessage] = useState(null);
  const searchref = useRef(false);
  const [td, settd] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [paginationList, setpaginationList] = useState(null);
  const [Loading, setLoading] = useState(false);

  const itretList = (data) => {
    let sr =
      state.currentPage != 1 ? +state.currentPage * 10 - 9 : state.currentPage;

    let list = data.map((i, k) => {
      return (
        <tr key={i.id}>
          <td>{sr++} </td>
          <td>{i.name} </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              data-id={i.id}
              onClick={() => {
                deleteHandler(i.id);
              }}
            >
              <i className="ni ni-fat-remove  "></i>
            </button>
            <Link
              to={`roles/permissions/${i.id}`}
              type="button"
              class="btn btn-outline-info"
            >
              <i className="ni ni-check-bold  "></i>
            </Link>
          </td>
        </tr>
      );
    });
    setLoading(false);
    settd(list);
  };

  const deleteHandler = (e) => {
    let con = window.confirm("Are you sure you want to delete this record ?");
    if (con) {
      const end = state.currentPage * 10;
      const start = end - 10;
      const getqueyParam = state.queryString;
      const buildQueryString = `?start=${start}&end=${10}&search=${
        getqueyParam.search
      }`;
      setLoading(true);
      settd(null);
      props.deleteRecord(e, buildQueryString);
    } else {
      return false;
    }
  };
  useEffect(() => {
    setLoading(false);

    if (props.list.length > 0) {
      const counter =
        Math.ceil(props.count / 10) > 3 ? 3 : Math.ceil(props.count / 10);
      const counterList = [...Array(counter)].map((i, k) => {
        return k + 1;
      });

      const updateState = {
        pageCount: Math.ceil(props.count / 10),
        pages: counterList,
      };
      dispatch({ type: "inisialState", payload: updateState });
      itretList(props.list);
    }
  }, [props.list, props.count]);

  useEffect(() => {
    pagination(state.pages);
  }, [state.pages]);

  const pagination = (n) => {
    const paginationListData = state.pages.map((i, k) => {
      const Activeclass = `page-item ${
        state.currentPage == i ? "active" : null
      }`;

      return (
        <li className={Activeclass} key={i}>
          <a
            className="page-link"
            href="#"
            data-count={i}
            onClick={(e) => {
              changePage(e);
            }}
          >
            {i}
          </a>
        </li>
      );
    });
    setpaginationList(paginationListData);
  };

  const changePage = (e) => {
    const cPage = e.target.dataset.count;
    setPegination(cPage);
  };

  useEffect(() => {
    const getMessage = localStorage.getItem("flash_message");
    if (getMessage) {
      const errorType = JSON.parse(getMessage).type;
      const errorMessage = JSON.parse(getMessage).message;
      setError(true);
      setErrorType(errorType);
      setErrorMessage(errorMessage);
    }

    const timer1 = setTimeout(() => {
      localStorage.removeItem("flash_message");
      setError(false);
      setErrorType(null);
      setErrorMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const searchapi = (e) => {
    const getqueyParam = state.queryString;
    const buildQueryString = `?start=${getqueyParam.start}&end=${getqueyParam.end}&search=${getqueyParam.search}`;
    const updateState = { currentPage: 1 };
    dispatch({ type: "currentPage", payload: updateState });
    setLoading(true);
    settd(null);
    props.searchhandleer(buildQueryString);
  };

  useEffect(() => {
    if (searchref.current) {
      debounceHandler = setTimeout(() => {
        searchapi();
      }, 1000);
      //cleanUp function
      return () => {
        clearTimeout(debounceHandler);
      };
    } else {
      searchref.current = true;
    }
  }, [searchInput]);

  const searchBox = (e) => {
    dispatch({ type: "search", payload: { search: e.target.value } });
    setSearchInput(e.target.value);
  };

  const prev = () => {
    if (state.currentPage != 1) {
      setPegination(state.currentPage - 1);
    }
  };
  const next = () => {
    if (state.currentPage != state.pageCount) {
      setPegination(state.currentPage + 1);
    }
  };

  const setPegination = (cPage) => {
    const getcounter =
      state.pageCount > +cPage + 2 ? +cPage + 2 : state.pageCount;
    const counterListArray = [...Array(getcounter)].map((i, k) => {
      return k + 1;
    });

    let list = [];
    if (cPage >= 1) {
      if (cPage > 1) {
        list.push(counterListArray[counterListArray.indexOf(+cPage)] - 1);
      }

      list.push(counterListArray[counterListArray.indexOf(+cPage)]);
      if (cPage < state.pageCount) {
        list.push(counterListArray[counterListArray.indexOf(+cPage) + 1]);
      }
    }

    const updateState = { pages: list, currentPage: cPage };
    dispatch({ type: "updatepage", payload: updateState });
    const end = cPage * 10;
    const start = end - 10;
    const updateQuery = { start: start, end: 10 };
    dispatch({ type: "updateQuery", payload: updateQuery });

    const getqueyParam = state.queryString;
    const buildQueryString = `?start=${start}&end=${10}&search=${
      getqueyParam.search
    }`;
    setLoading(true);
    settd(null);
    props.searchhandleer(buildQueryString);
  };

  const classess = `alert alert-${errorType} alert-dismissible fade show`;
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-header border-0">
              <div className="row  ">
                <div className="col-2">
                  <h3 className="mb-0">Roles</h3>
                </div>
                <div className="col-6">
                  {error ? (
                    <div className={classess} role="alert">
                      <span className="alert-text">{errorMessage}</span>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="col-4 pull-right">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="search"
                    onChange={searchBox}
                  />
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">sr.no</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {Loading ? (
                  <RowLoader />
                ) : td != null ? (
                  <tbody>{td}</tbody>
                ) : (
                  "No records found"
                )}
              </table>
            </div>
            <div className="card-footer py-4">
              <nav aria-label="...">
                <ul className="pagination justify-content-end mb-0">
                  <li
                    className={`page-item ${
                      state.currentPage == 1 ? "disabled" : null
                    }  `}
                  >
                    <a className="page-link" href="#" onClick={prev}>
                      <i className="fas fa-angle-left"></i>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {paginationList}

                  <li
                    className={`page-item ${
                      state.currentPage == state.pageCount ? "disabled" : null
                    }  `}
                  >
                    <a className="page-link" href="#" onClick={next}>
                      <i className="fas fa-angle-right"></i>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllRoles;
