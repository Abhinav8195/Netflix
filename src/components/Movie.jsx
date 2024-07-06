import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';

const Movie = ({ item }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [showTitle, setShowTitle] = useState(false); // State to track when to show title on hover

    const movieId = doc(db, 'users', `${user?.email}`);

    const saveshow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieId, {
                savedShows: arrayUnion({
                    id: item.id,
                    title: item.title,
                    img: item.backdrop_path,
                }),
            });
        } else {
            alert('Please login to save a movie');
        }
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const closePopup = (e) => {
        if (!e.target.closest('.popup-content')) {
            setIsPopupOpen(false);
        }
    };

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
            <div
                className="relative"
                onMouseEnter={() => setShowTitle(true)}
                onMouseLeave={() => setShowTitle(false)}
            >
                <img
                    className="w-full h-auto block rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                    src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                    alt={item?.title}
                    onClick={togglePopup}
                />
                {showTitle && (
                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2">
                        <p className="text-white text-center truncate">{item?.title}</p>
                    </div>
                )}
            </div>
            {isPopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-75" onClick={closePopup}>
                    <div className="popup-content bg-black rounded-lg p-4 max-w-[750px] overflow-hidden text-white">
                        <div className="relative mb-4">
                            <img
                                className="w-full h-auto block rounded-lg shadow-lg"
                                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                                alt={item?.title}
                            />
                            <button
                                className="absolute top-2 right-2 bg-gray-800 rounded-full text-white p-2 focus:outline-none"
                                onClick={togglePopup}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className='m-10 p-5'>
                            <p className='text-gray-400 text-sm'>Released: {item?.release_date}</p>
                            <p className='text-gray-400 text-sm'>Voted: {item?.vote_average}/10</p>
                            <p className="text-lg font-bold">{item?.title}</p>
                            <div className='max-h-36 overflow-y-auto'>
                                <p className='text-gray-200 whitespace-pre-line'>{item?.overview}</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            <button onClick={saveshow} className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                                {like ? <FaHeart className="text-gray-300" /> : <FaRegHeart className="text-gray-300" />}
                                <span>{like ? 'Liked' : 'Like'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;
