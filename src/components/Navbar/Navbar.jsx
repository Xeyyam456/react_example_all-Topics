

function Navbar() {
  return (
    <nav className="navbar   navbar-expand-lg navbar-light bg-light">
      <div className="container ">
        <a className="navbar-brand" href="#">Logo</a>

        <ul className="navbar-nav  d-flex color-white">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;