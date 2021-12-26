import React, { Component } from 'react';
import { Button } from './button';
import Progress from './progress';
import { SONG_BAR_PROGRESS_DIV_WIDTH } from '../constants';
import { formatTime } from '../utils';

class SongDetail extends React.Component {
  state = {
    player: this.props.player,
    currentLength: 0,
    songLength: 0,
  }
  
  updateProgress = (e) => {
    const progressBar = document.querySelector('.song_progress')
    let offset = e.target.getBoundingClientRect().left
    let newOffSet = e.clientX
    let newWidth = newOffSet - offset
    progressBar.style.width = newWidth+"px"
    let secPerPx = this.state.songLength / SONG_BAR_PROGRESS_DIV_WIDTH
    this.props.player.currentTime = secPerPx * newWidth
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        currentLength: Math.ceil(state.player.currentTime),
        songLength: Math.ceil(state.player.duration)
      }))

      let secPerPx = Math.ceil(this.state.player.duration) / SONG_BAR_PROGRESS_DIV_WIDTH
      let newWidth = this.state.player.currentTime / secPerPx
      document.querySelector('.song_progress').style.width = newWidth+"px"
      if(this.state.player.currentTime === this.state.player.duration){
        if(this.props.random === true){
          this.props.handleRandom()
        }
        else if(this.props.repeat === true){
          this.props.handleRepeat()
        }
        else{
          this.props.next()
        }
      }
    }, 1000);
  }

  render() { 
    return (
        <div className={`song ${this.props.open ? '' : 'simple'}`}>
          <Button className='backward' icon='angle-down' onClick={this.props.handleOpen} />
          <div className='song__cover-wrapper'>
            <div className="song__cover">
              <img src={this.props.data.cover} alt="" />
            </div>
            {this.props.open &&
              <div className='song__actions'>
                <Button className={ !this.props.random ? 'song__Button' : 'song__Button song__btn_active'} icon='random' onClick={() => this.props.handleRandom()}/>
                <Button className={ !this.props.repeat ? 'song__Button' : 'song__Button song__btn_active' } icon='repeat' onClick={() => this.props.handleRepeat()} />
              </div>
            }
          </div>
          <div className="song__info">
            <span className="song__name" onClick={!this.props.open ? this.props.handleOpen : undefined}>
              <span>{this.props.data.name}</span>
              <span className="song__author">{this.props.data.author}</span>
            </span>
            {this.props.open && <div className="song_duration">
                <div className="song_time__wrapper">
                  <div>{ formatTime(this.props.player.currentTime) }</div>
                  <div>{ formatTime(this.props.player.duration) }</div>
                </div>
                <div onClick={(e) => {this.updateProgress(e)}} 
                className="song_detail__status"><Progress/></div>
              </div>}
            <div className="song__panel">
              {this.props.open && <Button className='song__Button prev' icon='backward' disabled={!this.props.prev} onClick={this.props.prev} />}
              <Button className='song__Button' icon={this.props.pause ? 'play' : 'pause'} onClick={() => this.props.stop(this.props.index)} />
              <Button className='song__Button next' icon='forward' disabled={!this.props.next} onClick={this.props.next} />
            </div>
            {!this.props.open && <div className='info__status'><Progress/></div>}
          </div>
        </div>
      )
    }
}
 
export default SongDetail;
