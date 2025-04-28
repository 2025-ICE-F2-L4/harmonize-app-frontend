import React from 'react';
import './Activities.css';

import Bike_trip from '../../assets/activities/bike_trip.png';
import Board_games from '../../assets/activities/board_games.png';
import Diner from '../../assets/activities/diner.png';
import Movie from '../../assets/activities/movie.png';
import Picnic from '../../assets/activities/picnic.png';


const Activities = () => {
    return (  
        <div className="activities-page">
            <div className="activities-header">
                <h1>Choose an activity</h1>
            </div>

            <div className="activities-panel">
                <div className="activities-content">

                    <div className="activity-card">
                        <img src={Bike_trip} alt="Bike Trip" className="activity-image" />
                        <div className="activity-name">
                            <p>Bike trip</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Board_games} alt="Board Games" className="activity-image" />
                        <div className="activity-name">
                            <p>Board games</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Diner} alt="Diner" className="activity-image" />
                        <div className="activity-name">
                            <p>Diner</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Movie} alt="Movie" className="activity-image" />
                        <div className="activity-name">
                            <p>Movie</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Picnic} alt="Picnic" className="activity-image" />
                        <div className="activity-name">
                            <p>Picnic</p>
                        </div>
                    </div>


                    <div className="activity-card">
                        <img src={Bike_trip} alt="Bike Trip" className="activity-image" />
                        <div className="activity-name">
                            <p>Bike trip</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Board_games} alt="Board Games" className="activity-image" />
                        <div className="activity-name">
                            <p>Board games</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Diner} alt="Diner" className="activity-image" />
                        <div className="activity-name">
                            <p>Diner</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Movie} alt="Movie" className="activity-image" />
                        <div className="activity-name">
                            <p>Movie</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Picnic} alt="Picnic" className="activity-image" />
                        <div className="activity-name">
                            <p>Picnic</p>
                        </div>
                    </div>


                    <div className="activity-card">
                        <img src={Bike_trip} alt="Bike Trip" className="activity-image" />
                        <div className="activity-name">
                            <p>Bike trip</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Board_games} alt="Board Games" className="activity-image" />
                        <div className="activity-name">
                            <p>Board games</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Diner} alt="Diner" className="activity-image" />
                        <div className="activity-name">
                            <p>Diner</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Movie} alt="Movie" className="activity-image" />
                        <div className="activity-name">
                            <p>Movie</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Picnic} alt="Picnic" className="activity-image" />
                        <div className="activity-name">
                            <p>Picnic</p>
                        </div>
                    </div>


                    <div className="activity-card">
                        <img src={Bike_trip} alt="Bike Trip" className="activity-image" />
                        <div className="activity-name">
                            <p>Bike trip</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Board_games} alt="Board Games" className="activity-image" />
                        <div className="activity-name">
                            <p>Board games</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Diner} alt="Diner" className="activity-image" />
                        <div className="activity-name">
                            <p>Diner</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Movie} alt="Movie" className="activity-image" />
                        <div className="activity-name">
                            <p>Movie</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Picnic} alt="Picnic" className="activity-image" />
                        <div className="activity-name">
                            <p>Picnic</p>
                        </div>
                    </div>


                    <div className="new-activity-card">
                        <button className='new-activity-button'> +</button>
                    </div>
                    {/* Add more activity cards as needed */}
                </div>
            </div>
            
        </div>
    );
}
 
export default Activities;