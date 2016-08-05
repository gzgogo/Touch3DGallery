import React from 'react';

import Touch3DGallery from '../components/Touch3DGallery/Touch3DGallery';

var items = [
  {
    image: require('../../images/1.jpg'),
    text: 'http://www.percivalclo.com'
  },
  {
    image: require('../../images/2.jpg'),
    text: 'http://www.wanda.net/fr'
  },
  {
    image: require('../../images/3.jpg'),
    text: 'http://lifeingreenville.com'
  },
  {
    image: require('../../images/4.jpg'),
    text: 'http://circlemeetups.com'
  },
  {
    image: require('../../images/5.jpg'),
    text: 'http://www.castirondesign.com'
  },
  {
    image: require('../../images/6.jpg'),
    text: 'http://www.mathiassterner.com/home'
  }
];

var App = React.createClass({
  _gallery: null,

  render() {
    return (
      <div className="app">
        <div className="gallery-container">
          <Touch3DGallery items={items} onMounted={this.onGalleryMounted} touch={false}/>
        </div>
        <nav>
          <button onClick={this.onPrev}>&lt;</button>
          <button onClick={this.onNext}>&gt;</button>
        </nav>
      </div>
    );
  },

  onGalleryMounted(gallery) {
    this._gallery = gallery;
  },

  onPrev() {
    if (this._gallery) {
      this._gallery.prev();
    }
  },

  onNext() {
    if (this._gallery) {
      this._gallery.next();
    }
  }
});

module.exports = App;
