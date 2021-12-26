import React, { Component } from 'react';
import { Button } from './button';


class SongList extends React.Component {
  render() { 
      return <div className='list'>
      <h3 className='list__title'>
        Songs
        {(!this.props.active && this.props.active !== 0) &&
          <Button className='list__action' icon='play' onClick={() => this.props.stop(0)} />
        }
      </h3>
      <div className={`list__wrapper ${this.props.open ? 'bg' : ''}`}>
        {this.props.list.map((el, index) => (
          <div key={index} className={`list__item ${this.props.active === index ? 'active' : ''}`} 
          style={{ transitionDelay: `${0.075 * index}s` }} onClick={() => this.props.stop(index)}>
            <span className='list__cover' style={{ transitionDelay: `${0.075 * index}s` }}>
              <img src={el.cover} />
            </span>
            <div className='info' >
              <span className='info__name'>{el.name}</span>
              <span className='info__author'>{el.author}</span>
            </div>
            <span className='info__duration' style={{ transitionDelay: `${0.075 * index}s` }}>
              {el.duration}
            </span>
          </div>
        ))}
      </div>
    </div>;
  }
}
 
export default SongList;