import React, { useState, useRef, useEffect } from 'react';


const tooltipRef = useRef(null);


<OverlayTrigger
  placement="top"
  overlay={
    <Tooltip
      id={`tooltip-${header}`}
      show={showColumnTooltip === header}
      ref={tooltipRef}
    >
      {/* ... (tooltip content) */}
    </Tooltip>
  }
>
  {/* ... (the rest of the tooltip code) */}
</OverlayTrigger>


useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        // Click occurred outside the tooltip, close it
        setShowColumnTooltip(null);
      }
    }
  
    // Add the event listener when the component mounts
    document.addEventListener('click', handleClickOutside);
  
    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  <Tooltip
  id={`tooltip-${header}`}
  show={showColumnTooltip === header}
>
  <InputGroup size="sm">
    <FormControl
      placeholder={`Search ${header}`}
      value={searchQuery}
      onChange={handleSearch}
    />
    <InputGroup.Append>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => setShowColumnTooltip(null)}
      >
        Reset
      </Button>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => {
          setShowColumnTooltip(null);
          clearSortAndSearch();
        }}
      >
        Apply
      </Button>
      <Button
        variant="link"
        size="sm"
        className="close-button"
        onClick={() => setShowColumnTooltip(null)}
      >
        Close
      </Button>
    </InputGroup.Append>
  </InputGroup>
</Tooltip>

  