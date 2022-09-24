
function NavBar() {
  const LogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };
  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Student Managment Portal</a>
        <form className="d-flex" role="search">
          <button
            className="btn btn-outline-danger"
            style={{ marginLeft: 20 }}
            type="submit"
            onClick={LogOut}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
