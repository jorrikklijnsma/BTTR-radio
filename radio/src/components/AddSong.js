import { useState } from 'react'
import firebase from '../utils/firebase';

export default function AddSong(props) {
    const [youtubeId, setYoutubeId] = useState('');
    const [hasValue, setHasValue] = useState('');
    const [youtubeTitle, setYoutubeTitle] = useState();

    const IsYoutubeVideo = (videoId) => {
        fetch(`http://noembed.com/embed?url=http%3A//www.youtube.com/watch%3Fv%3D${videoId}`, {
            method: 'get'
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.error) {
                setYoutubeTitle(false);
            } else {
                setYoutubeTitle(data.title);
            }
        })
    };

    const addSongToDb = () => {
        if (youtubeTitle) {
            const songRef = firebase.database().ref("radio/songList");
            songRef.orderByChild("youtubeId").equalTo(youtubeId).once("value",snapshot => {
                if (!snapshot.exists()) {
                    const song = {
                        youtubeId,
                        upVotes: {},
                        downVotes: {},
                        randomize: Math.random(),
                    }
                    songRef.push(song);
                    props.modalInteraction(false);
                    const message = {
                        message: `${youtubeTitle} is toegevoegd`,
                        color: 'lime-700',
                        timer: 4000,
                    }
                    props.message(message);
                } else {
                    const message = {
                        message: 'Dit nummer staat al in de lijst',
                        color: 'rose-800',
                        timer: 4000,
                    }
                    props.message(message);
                }
            });   
        } else {
            const message = {
                message: 'Dit Youtube ID bestaat niet',
                color: 'rose-800',
                timer: 3000,
            }
            props.message(message);
        }
    };

    const onChangeHandler = (e) => {
        const value = e.target.value
        setYoutubeId(value);
        IsYoutubeVideo(value);
        if(value === '') {
            setHasValue(false);
        } else {
            setHasValue(true);
        }
    };

    return (
        <div className="flex flex-col items-end space-y-8 w-2/3 mx-auto">
            <div className="input-group w-full relative pt-4">
                <label className={`${hasValue ? "translate-y-0 scale-75 opacity-40" : "translate-y-6"} absolute top-0 left-0 transition duration-200 transform origin-top-left pointer-events-none`}>
                    Type hier je youtube video ID
                </label>
                <input
                    type="text"
                    className="w-full h-10 bg-transparent border-b-2 border-purple-200 focus:outline-none focus:border-lime-500"
                    onChange={onChangeHandler}
                />
            </div>
            <button
                className="transition-all duration-200 hover:tracking-wider hover:bg-lime-500 bg-transparent hover:text-white text-lime-500 rounded focus:outline-none hover:ring-0 ring-2 ring-lime-400 ring-inset shadow hover:shadow-xl font-bold text-lg py-2 hover:px-6 px-5"
                onClick={addSongToDb}
            >
                Toevoegen
            </button>
            <span>
                Youtube video = {youtubeTitle ? 'youtubeTitle' : 'Not found'}
            </span>
        </div>
    )
}
