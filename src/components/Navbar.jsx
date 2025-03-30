import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { FaDatabase } from 'react-icons/fa';

const Navbar = ({ onDocsClick }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-0">
      <Container fluid>
        <BootstrapNavbar.Brand href="#home" className="d-flex align-items-center">
          <FaDatabase className="me-2" />
          SQL Query Runner
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" onClick={(e) => {
              e.preventDefault();
              if (onDocsClick) onDocsClick(false);
            }}>Home</Nav.Link>
            <Nav.Link href="#docs" onClick={(e) => {
              e.preventDefault();
              if (onDocsClick) onDocsClick(true);
            }}>Documentation</Nav.Link>
            <Nav.Link href="https://github.com/sohan-gupthak/atlan-frontend-task" target="_blank">
              GitHub
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
