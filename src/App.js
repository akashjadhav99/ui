import "./App.css";
import Header from "./layouts/header";
import Navbar from "./layouts/navbar";
import Sidebar from "./layouts/sidebar";
import Dashboard from "./layouts/dashboard";
import Footer from "./layouts/footer";
import Wrapper from "./layouts/wrapper";

function App() {
  return (
    <Wrapper>
      <Dashboard />
    </Wrapper>
  );
}

export default App;
