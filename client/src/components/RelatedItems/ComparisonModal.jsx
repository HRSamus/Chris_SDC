import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Feature from './Feature.jsx';





const customStyles = {
  overlay: {
    pointerEvents: 'none',
    background: 'none',
    zIndex: 1000,

  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    background: 'white',
    width: '35em'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const ComparisonModal = ({modalIsOpen, comparisonProduct, currentProduct }) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
const features = comparisonProduct.features.concat(currentProduct.features);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h5 ref={(_subtitle) => (subtitle = _subtitle)}>Comparing </h5>
        <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
          <h3>{currentProduct.name}</h3>
          <h3>{comparisonProduct.name}</h3>
        </div>
        <div>
          {features.map((feature, index) => {
            return <Feature feature={feature} currentProductFeatures={currentProduct.features} comparisonProductFeatures={comparisonProduct.features} key={index}/>
          })}
        </div>
      </Modal>
    </div>
    );
}

export default ComparisonModal;