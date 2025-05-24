import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";

export default function Navbar() {
  const { logout } = useAuth();
  const { authenticated, user, setAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/dashboard", name: "Dashboard", icon: "bi-kanban" },
    // { path: '/projects', name: 'Projects', icon: 'bi-folder' },
    // { path: '/team', name: 'Team', icon: 'bi-people' },
  ];

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark ${
        scrolled ? "bg-dark shadow-lg" : "bg-dark"
      } fixed-top`}
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to={authenticated ? "/dashboard" : "/"}
          onClick={() => setExpanded(false)}
        >
          <i className="bi bi-check2-circle fs-3 text-primary me-2"></i>
          <span className="fw-bold fs-4">
            Sparke<span className="text-primary">Task</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          {authenticated && (
            <>
              <Nav className="mx-auto">
                {navLinks.map((link) => (
                  <Nav.Item key={link.path}>
                    <Link
                      className={`nav-link px-3 d-flex align-items-center ${
                        location.pathname === link.path
                          ? "active text-primary fw-bold"
                          : ""
                      }`}
                      to={link.path}
                      onClick={() => setExpanded(false)}
                    >
                      <i className={`bi ${link.icon} me-2`}></i>
                      {link.name}
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>

              <div className="d-flex align-items-center ms-lg-auto">
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="dark"
                    className="d-flex align-items-center bg-transparent border-0"
                    id="dropdown-user"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="rounded-circle me-2"
                        width="32"
                        height="32"
                      />
                    ) : (
                      <i className="bi bi-person-circle fs-4 me-2"></i>
                    )}
                    <span className="d-none d-lg-inline">
                      {user?.name || "Account"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-dark shadow">
                    {/* <Dropdown.Item as={Link} to="/profile">
                      <i className="bi bi-person me-2"></i>Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">
                      <i className="bi bi-gear me-2"></i>Settings
                    </Dropdown.Item>
                    <Dropdown.Divider /> */}
                    <Dropdown.Item onClick={logout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          )}

          {!authenticated && (
            <div className="d-flex ms-lg-auto">
              <Link
                to="/login"
                className="btn btn-outline-light me-2"
                state={{ from: location.pathname }}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
