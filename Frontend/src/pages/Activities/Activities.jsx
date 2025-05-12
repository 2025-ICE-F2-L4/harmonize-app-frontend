import React from 'react';
import './Activities.css';

import Boardgames from '../../assets/activities/boardgames.png';
import Camp from '../../assets/activities/camp.png';
import Cinema from '../../assets/activities/cinema.png';
import Cooking from '../../assets/activities/cooking.png';
import Dinner from '../../assets/activities/dinner.png';
import Diy from '../../assets/activities/diy.png';
import Gaming from '../../assets/activities/gaming.png';
import Gardening from '../../assets/activities/gardening.png';
import Groceries from '../../assets/activities/groceries.png';
import Museum from '../../assets/activities/museum.png';
import Picnic from '../../assets/activities/picnic.png';
import Reading from '../../assets/activities/reading.png';
import Swimming from '../../assets/activities/swimming.png';
import Walk from '../../assets/activities/walk.png';
import Zoo from '../../assets/activities/zoo.png';


const Activities = () => {
    return (  
        <div className="activities-page">
            <div className="activities-header">
                <h1>Choose an activity</h1>
            </div>

            <div className="activities-panel">
                <div className="activities-content">

                    <div className="activity-card">
                        <img src={Boardgames} alt="Board games" className="activity-image" />
                        <div className="activity-name">
                            <p>Board games</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Camp} alt="Camp" className="activity-image" />
                        <div className="activity-name">
                            <p>Camp</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Cinema} alt="Cinema" className="activity-image" />
                        <div className="activity-name">
                            <p>Cinema</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Cooking} alt="Cooking" className="activity-image" />
                        <div className="activity-name">
                            <p>Cooking</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Dinner} alt="Dinner" className="activity-image" />
                        <div className="activity-name">
                            <p>Dinner</p>
                        </div>
                    </div>

                    <div className="activity-card">
                        <img src={Diy} alt="Diy" className="activity-image" />
                        <div className="activity-name">
                            <p>Diy</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Gaming} alt="Gaming" className="activity-image" />
                        <div className="activity-name">
                            <p>Gaming</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Gardening} alt="Gardening" className="activity-image" />
                        <div className="activity-name">
                            <p>Gardening</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Groceries} alt="Groceries" className="activity-image" />
                        <div className="activity-name">
                            <p>Groceries</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Museum} alt="Museum" className="activity-image" />
                        <div className="activity-name">
                            <p>Museum</p>
                        </div>
                    </div>

                    <div className="activity-card">
                        <img src={Picnic} alt="Picnic" className="activity-image" />
                        <div className="activity-name">
                            <p>Picnic</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Reading} alt="Reading" className="activity-image" />
                        <div className="activity-name">
                            <p>Reading</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Swimming} alt="Swimming" className="activity-image" />
                        <div className="activity-name">
                            <p>Swimming</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Walk} alt="Walk" className="activity-image" />
                        <div className="activity-name">
                            <p>Walk</p>
                        </div>
                    </div>
                    <div className="activity-card">
                        <img src={Zoo} alt="Zoo" className="activity-image" />
                        <div className="activity-name">
                            <p>Zoo</p>
                        </div>
                    </div>


                    <div className="new-activity-card">
                        <button className='new-activity-button'> + </button>
                    </div>

                </div>
            </div>
            
        </div>
    );
}
 
export default Activities;