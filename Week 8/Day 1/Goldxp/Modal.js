import React, { Component } from 'react';

const modalStyles = {
  background: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  body: {
    padding: '20px',
    background: 'white',
    borderRadius: '5px',
    minWidth: '300px',
    maxWidth: '500px'
  },
  closeButton: {
    marginTop: '10px'
  }
};

class Modal extends Component {
  render() {
    return (
      <div style={modalStyles.background} onClick={this.props.onClose}>
        <div style={modalStyles.body} onClick={(e) => e.stopPropagation()}>
          {this.props.children}
          <button 
            className="btn btn-secondary" 
            style={modalStyles.closeButton}
            onClick={this.props.onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;