import React from 'react';
import PropTypes from 'prop-types';

export default class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <a>Home</a>
        <a>Books</a>
        <a>Reading Records</a>
        <a>Moments</a>
        <a>Notifications</a>
      </div>
    );
  }
}

TitleBar.prototypes = {
  title: PropTypes.string.isRequired
}

TitleBar.defaultProps = {
  title: 'BookStack App'
}