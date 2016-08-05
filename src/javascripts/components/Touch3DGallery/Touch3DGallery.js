
import './Touch3DGallery.css';
import React, { PropTypes } from 'react';
import CreateGallery from './gallery';

class Touch3DGallery extends React.Component {


  componentDidMount() {
    var gallery = CreateGallery(this.refs.touchGallery);

    if (this.props.touch) {
      gallery.bindTouchEvent();
    }

    if (this.props.onMounted) {
      this.props.onMounted(gallery);
    }
  }

  render() {
    var itemNodes = this.props.items.map(function (item, index) {
      return (
        <a className="item" href="#" key={'item' + index}>
          <img src={item.image} alt={item.text}/>
          <div>{item.text}</div>
        </a>
      );
    });
    return (
      <div className="touch-3d-gallery" ref="touchGallery">
        <div className="item-wrapper">
          {itemNodes}
        </div>
      </div>
    );
  }
}

Touch3DGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    text: PropTypes.string
  })),
  touch: PropTypes.bool,
  onMounted: PropTypes.func
};

Touch3DGallery.defaultProps = {
  touch: false
}

export default Touch3DGallery;
