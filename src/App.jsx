import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";

function App() {
  const path = window.location.pathname;

  let Page;

  if (path === "/about") {
  Page = About;
} else if (path === "/services") {
  Page = Services;
} else if (path === "/projects") {
  Page = Projects;
} else {
  Page = Home;
}
  return (
    <>
      <Navbar />
      <Page />
    </>
  );
}

export default App;