import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  const path = window.location.pathname;

  let Page;

  if (path === "/about") {
    Page = About;
  } else if (path === "/services") {
    Page = Services;
  } else if (path === "/projects") {
    Page = Projects;
  } else if (path === "/contact") {
    Page = Contact;
  } else {
    Page = Home;
  }

  return (
    <>
      <Navbar />
      <Page />
      <Footer />
    </>
  );
}

export default App;