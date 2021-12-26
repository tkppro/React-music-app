import React, { Component } from 'react';
import './App.css';
import { songList } from './seeds';
import SongList from './components/songList';
import SongDetail from './components/songDetail';

const player = new Audio(songList[0].source)
player.setAttribute('preload', 'metadata')

class App extends React.Component {
  state = {
    open: false,
    active: false,
    pause: false,
    random: false,
    repeat: false,
  };
  componentDidUpdate() {
    if (this.state.pause)
      player.pause()
    else {
      player.play()
    }
  }

  handleOpen = () => { this.setState(state => ({ open: !state.open })) };
  pause = () => {
    this.setState(state => ({ pause: !this.state.pause }))
  }
  handlePlay = (active) => {
    if (this.state.active === active) {
      this.pause()
    }
    else {
      if (this.state.random) {
        this.handleRandom()
        return
      }
      else {
        if(this.state.pause)
          this.pause()
        player.pause()
        player.src = songList[active].source
        player.load()
        player.play()
      }
      this.setState(state => ({
        active: state.active === active ? false : active
      }))
    }
  };
  next = () => this.handlePlay(this.state.active < songList.length - 1 ? this.state.active + 1 : 0);
  prev = () => this.handlePlay(this.state.active > 0 ? this.state.active - 1 : songList.length - 1);

  handleRandom = () => {
    let song_length = songList.length
    let new_active_song_idx = (parseInt(Math.random() * 1000)) % song_length
    this.setState(state => ({
      active: new_active_song_idx,
    }))

    player.pause()
    player.src = songList[new_active_song_idx].source
    player.load()
    player.play()
  }

  handleRepeat = () => {
    player.play()
  }

  setRandom = () => {
    this.setState(state => ({
      random: !this.state.random,
      repeat: false,
    }))
  }

  setRepeat = () => {
    this.setState(state => ({
      random: false,
      repeat: !this.state.repeat,
    }))
  }

  render() {
    const { active, open, pause, random, repeat } = this.state;
    return (
      <div className='player'>
        <SongList
          list={songList}
          stop={this.handlePlay}
          open={open}
          handle={this.handlePlay}
          active={active}
        />
        {(active || active === 0) &&
          <SongDetail
            open={open}
            data={songList[active]}
            index={active}
            handleOpen={this.handleOpen}
            pause={pause}
            stop={this.handlePlay}
            handleRandom={this.setRandom}
            handleRepeat={this.setRepeat}
            random={random}
            player={player}
            repeat={repeat}
            next={this.next}
            prev={this.prev} />
        }
      </div>
    )
  }
};

export default App;
