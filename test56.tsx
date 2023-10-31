import React, { cloneElement } from 'react';

class App extends React.Component {
  addIdToElement(element, id) {
    return cloneElement(element, {
      id,
      children: React.Children.map(element.props.children, child => {
        if (React.isValidElement(child)) {
          return this.addIdToElement(child, `${id}-${child.type.name}`);
        }
        return child;
      }),
    });
  }

  render() {
    const { children } = this.props;
    const childrenWithId = React.Children.map(children, child =>
      this.addIdToElement(child, child.type.name)
    );

    return <div>{childrenWithId}</div>;
  }
}

export default App;
