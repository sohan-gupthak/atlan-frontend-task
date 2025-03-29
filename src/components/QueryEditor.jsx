import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Button, Card, Modal, Form, InputGroup } from 'react-bootstrap';
import { FaPlay, FaSave, FaDownload, FaIndent, FaCheck } from 'react-icons/fa';
import AceEditor from 'react-ace';

import ace from 'ace-builds';
import 'ace-builds/src-min-noconflict/mode-sql';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/ext-language_tools';

// Setting the correct path for Ace to resolve the path issues
ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.set('modePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.set('themePath', '/node_modules/ace-builds/src-min-noconflict');
ace.config.set('workerPath', '/node_modules/ace-builds/src-min-noconflict');

const QueryEditor = ({ query, onQueryChange, onExecute }) => {
  const editorRef = useRef(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [queryName, setQueryName] = useState('');
  const [savedQueries, setSavedQueries] = useState(() => {
    const saved = localStorage.getItem('savedQueries');
    return saved ? JSON.parse(saved) : [];
  });

  // useCallback to memoize the execute function
  const handleExecute = useCallback(() => {
    onExecute(query);
  }, [onExecute, query]);

  const handleKeyDown = (event) => {
    // feat: Execute query on Ctrl+Enter or Cmd+Enter
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      handleExecute();
    }
  };

  useEffect(() => {
    const setupKeyBinding = () => {
      if (editorRef.current && editorRef.current.editor) {
        const editor = editorRef.current.editor;
        
        // Removing any existing command with the same name to avoid duplicates
        editor.commands.removeCommand('executeQuery');
        
        editor.commands.addCommand({
          name: 'executeQuery',
          bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
          exec: handleExecute
        });
      }
    };
    
    setupKeyBinding();
    
    // Setting up again after a short delay to ensure editor is fully loaded
    const timerId = setTimeout(setupKeyBinding, 100);
    
    return () => clearTimeout(timerId);
  }, [handleExecute]);
  
  const formatQuery = () => {
    if (!query) return;
    
    let formatted = query
      .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|HAVING|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|OUTER JOIN|LIMIT)\b/gi, '\n$1')
      .replace(/\n/g, '\n  ')
      .trim();
    
    const keywords = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'LIMIT', 'AND', 'OR', 'AS'];
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, keyword.toUpperCase());
    });
    
    onQueryChange(formatted);
  };

  // Saving query to localStorage
  const handleSaveQuery = () => {
    if (!queryName.trim() || !query.trim()) return;
    
    const newSavedQueries = [
      ...savedQueries,
      { id: Date.now(), name: queryName, query: query }
    ];
    
    setSavedQueries(newSavedQueries);
    localStorage.setItem('savedQueries', JSON.stringify(newSavedQueries));
    setShowSaveModal(false);
    setQueryName('');
  };

  // Downloading query as SQL file
  const handleDownloadQuery = () => {
    if (!query.trim()) return;
    
    const blob = new Blob([query], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query.sql';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="query-editor-card mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div>SQL Query Editor</div>
          {savedQueries.length > 0 && (
            <Button 
              variant="link" 
              size="sm"
              className="ms-2 text-decoration-none"
              onClick={() => setShowSaveModal(true)}
            >
              ({savedQueries.length} saved queries)
            </Button>
          )}
        </div>
        <div>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2"
            title="Format Query"
            onClick={formatQuery}
          >
            <FaIndent />
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2"
            title="Save Query"
            onClick={() => setShowSaveModal(true)}
            disabled={!query.trim()}
          >
            <FaSave />
          </Button>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="me-2"
            title="Download Query as SQL File"
            onClick={handleDownloadQuery}
            disabled={!query.trim()}
          >
            <FaDownload />
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleExecute}
            title="Execute Query (Ctrl+Enter)"
          >
            <FaPlay className="me-1" /> Execute
          </Button>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <AceEditor
          ref={editorRef}
          mode="sql"
          theme="monokai"
          name="sql-editor"
          value={query}
          onChange={onQueryChange}
          fontSize={14}
          width="100%"
          height="200px"
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          onKeyDown={handleKeyDown}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          editorProps={{ $blockScrolling: true }}
        />
      </Card.Body>
      <Card.Footer className="text-muted small">
        Press Ctrl+Enter to execute query
      </Card.Footer>

      {/* Save Query Modal */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Query Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter a name for your query"
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                />
                <Button 
                  variant="primary" 
                  onClick={handleSaveQuery}
                  disabled={!queryName.trim()}
                >
                  <FaCheck /> Save
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          {savedQueries.length > 0 && (
            <div className="mt-3">
              <h6>Saved Queries</h6>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {savedQueries.map(sq => (
                  <div key={sq.id} className="d-flex justify-content-between align-items-center p-2 border-bottom">
                    <div>{sq.name}</div>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => {
                        onQueryChange(sq.query);
                        setShowSaveModal(false);
                      }}
                    >
                      Load
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default QueryEditor;
