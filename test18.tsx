/* CustomTabStyles.css */
.custom-tabs .nav-link {
    position: relative;
    border: none;
    color: black;
    text-decoration: none;
    padding: 10px 15px;
    margin: 0 5px;
    transition: color 0.2s, border-color 0.2s;
  }
  
  .custom-tabs .nav-link.active {
    color: blue;
  }
  
  .custom-tabs .nav-link:before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: blue;
    transform: scaleX(0);
    transition: transform 0.2s;
  }
  
  .custom-tabs .nav-link.active:before {
    transform: scaleX(1);
  }
  
  .custom-tabs .nav-link:focus,
  .custom-tabs .nav-link:hover {
    color: blue;
    border-color: transparent;
  }
  