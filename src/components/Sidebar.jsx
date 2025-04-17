import React, { useState } from 'react';
import { Nav, Accordion, ListGroup, Badge, Alert, Button, Modal } from 'react-bootstrap';
import { FaTable, FaHistory, FaCode, FaBookmark, FaStar, FaDatabase, FaEye } from 'react-icons/fa';
import { generateCompleteDDL } from '../utils/ddlGenerator';
import { toast } from 'react-toastify';

const Sidebar = ({ activeTable, onTableSelect, queryHistory, predefinedQueries, savedQueries = [], onQuerySelect, tables = ['products', 'orders', 'suppliers', 'shippers', 'regions', 'territories', 'amazon'] }) => {
  const [showDDLModal, setShowDDLModal] = useState(false);
  const [selectedTableDDL, setSelectedTableDDL] = useState('');
  const [selectedTableName, setSelectedTableName] = useState('');
  
  // DDL Modal
  const handleCloseDDLModal = () => setShowDDLModal(false);

  return (
    <div className="sidebar">
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaTable className="me-2" /> Tables
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              {tables.map((table) => (
                <ListGroup.Item 
                  key={table}
                  action
                  active={activeTable === table}
                  onClick={() => onTableSelect(table)}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <FaDatabase className="me-2" size={12} />
                    {table.charAt(0).toUpperCase() + table.slice(1)}
                  </div>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="py-0 px-2"
                    title="View table DDL"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTableName(table);
                      setSelectedTableDDL(generateCompleteDDL(table));
                      setShowDDLModal(true);
                    }}
                  >
                    <FaEye size={12} /> DDL
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaBookmark className="me-2" /> Predefined Queries
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              {predefinedQueries.map((item, index) => (
                <ListGroup.Item 
                  key={index}
                  action
                  onClick={() => onQuerySelect(item.query)}
                  className="query-item"
                >
                  <div className="query-name">{item.name}</div>
                  <div className="query-preview">{item.query.substring(0, 40)}...</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaStar className="me-2" /> My Saved Queries
            {savedQueries.length > 0 && (
              <Badge bg="primary" className="ms-2">{savedQueries.length}</Badge>
            )}
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              {savedQueries.length > 0 ? (
                savedQueries.map((item) => (
                  <ListGroup.Item 
                    key={item.id}
                    action
                    onClick={() => onQuerySelect(item.query)}
                    className="query-item"
                  >
                    <div className="query-name">{item.name}</div>
                    <div className="query-preview">{item.query.substring(0, 40)}...</div>
                  </ListGroup.Item>
                ))
              ) : (
                <Alert variant="light" className="m-2 py-2">
                  No saved queries yet. Click the save button in the SQL editor to save your queries.
                </Alert>
              )}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FaHistory className="me-2" /> History
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              {queryHistory.length > 0 ? (
                queryHistory.map((item, index) => (
                  <ListGroup.Item 
                    key={index}
                    action
                    onClick={() => onQuerySelect(item.query)}
                    className="query-item"
                  >
                    <div className="query-preview">{item.query.substring(0, 40)}...</div>
                    <small className="text-muted">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </small>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No history yet</ListGroup.Item>
              )}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
      {/* DDL Modal */}
      <Modal show={showDDLModal} onHide={handleCloseDDLModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaDatabase className="me-2" />
            {selectedTableName.charAt(0).toUpperCase() + selectedTableName.slice(1)} - DDL
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className="bg-dark text-light p-3 rounded" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {selectedTableDDL}
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDDLModal}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              // Copy to clipboard
              navigator.clipboard.writeText(selectedTableDDL)
                .then(() => {
                  toast.success(`DDL for ${selectedTableName} copied to clipboard!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                  });
                })
                .catch(err => {
                  toast.error("Failed to copy to clipboard", {
                    position: "top-right",
                    autoClose: 2000
                  });
                  console.error("Clipboard copy failed:", err);
                });
            }}
          >
            Copy to Clipboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
