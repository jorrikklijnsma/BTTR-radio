import { useState } from 'react'
import AddSong from './components/AddSong';
import PlayPage from './components/PlayPage';
import YouTube from 'react-youtube';
import firebase from './utils/firebase';

function App() {
  const [openModal, setModal] = useState();
  const [addMessage, setMessage] = useState({});
  const [videoId, setVideo] = useState('2J7Q6tLyd7Y');
  const [videoInfo, setVideoInfo] = useState({});

  const getVideoInfo = (youtubeId) => {
    fetch(`http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3D${youtubeId}`, {
        method: 'get'
    }).then(response => response.json())
    .then(data => {
        setVideoInfo(data);
    });
  };

  const clickAddSongHandler = (stateToSet) => {
    setModal(stateToSet);
  };

  const messageHandler = (message) => {
    message.open = true;
    setMessage(message);
    setTimeout(() => {
      message.open = false;
      setMessage(message);
    }, message.timer)
  };

  const songEnded = () => {
    console.log('video ended');
      new Promise((resolve, reject) => {
        console.log('test')
        firebase.database().ref("radio/playNext").get().then((snapshot) => {
        console.log('then run');
        if (!snapshot.exists()) {
          reject(false);
        } else {
          if (snapshot.val() === videoId) {
            console.log('Next video is same');
            reject(false);
          } else {
            console.log('Next video is set');
            resolve(snapshot.val());
          }
        }
      })
    }).then((response) => {
      setVideo(response);
      getVideoInfo(response);
    })
    .catch(() => {
      const randomStart = Math.random();
      new Promise((resolve, reject) => {
        firebase.database().ref("radio/songList")
        .orderByChild('randomize')
        .startAt(randomStart)
        .limitToFirst(1)
        .once("value")
        .then((snapshot) => {
          if (!snapshot.exists()) {
            resolve('yydNF8tuVmU');
          } else {
            let returnVal;
            snapshot.forEach((child) => {
              returnVal = child.val();
            });
            firebase.database().ref("radio/playNext").set(returnVal.youtubeId);
            resolve(returnVal.youtubeId);
          }
        })
      }).then((response) => {
        setVideo(response);
        getVideoInfo(response);
      })
    });
  };

  const opts = {
    height: '400',
    width: '400',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="relative grid place-items-center bg-gradient-to-r from-violet-800 to-purple-700 text-white min-h-screen py-40 px-8">
      <div 
        className="absolute top-0 right-0 flex flex-col items-center justify-center cursor-pointer text-white transition duration-200 group transform hover:-translate-y-1 mt-10 mr-8"
        onClick={() => clickAddSongHandler(true)}
      >
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path></svg>
        <span className="opacity-0 pointer-events-none transition duratio-200 transform -translate-y-1/2 group-hover:-translate-y-0 group-hover:opacity-90 group-hover:pointer-events-auto">
          Add Song
        </span>
      </div>
      <div className={`${addMessage.open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-event-none -translate-y-full scale-75 opacity-0'} bg-${addMessage.color} absolute top-0 right-0 px-4 py-2 text-lg mt-10 mr-8 transform origin-top-right transition duration-200`}>
        {addMessage.message}
      </div>
      <div className="bg-purple-900 p-12 rounded-3xl shadow-2xl w-full max-w-2xl">
        {openModal ? 
        <div>
          <header className="flex justify-between mb-6">
            <h1><strong>Add</strong> song</h1>
            <span
              className="transition duration-200 text-white hover:text-lime-500 cursor-pointer ml-4"
              onClick={() => clickAddSongHandler(false)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
            </span>
          </header>
          <AddSong modalInteraction={(e) => clickAddSongHandler(e)} message={(e) => messageHandler(e)}/>
        </div>
        : <PlayPage
          videoInfo={videoInfo}
        />}
      </div>
      <YouTube videoId={videoId} opts={opts} onEnd={songEnded} />
    </div>
  );
}

export default App;