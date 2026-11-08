
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";

import CMSApp from "./cms/CMSApp";

function App() {
  const path = window.location.pathname;

  if (path === "/cms" || path.startsWith("/cms/")) {
    return <CMSApp />;
  }

  let Page;

  if (path === "/about") {
    Page = About;
  } else if (path === "/services") {
    Page = Services;
  } else if (path === "/projects") {
    Page = Projects;
  } else if (path === "/blog") {
    Page = Blog;
  } else if (path.startsWith("/blog/")) {
    Page = BlogArticle;
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
