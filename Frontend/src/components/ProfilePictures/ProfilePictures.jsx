import './ProfilePictures.css';
import Mom from '../../assets/icons/mom.svg';
import Dad from '../../assets/icons/dad.svg';

const ProfilePictures = () => {

    return (
    <div className="characters">
        <div className="character-box">
            <img src={Dad} alt="Dad" className="character-image"/>
        </div>
            
            
            <div className="character-box">
                <img src={Mom} alt="Mom" className="character-image"/>
            </div>
            
    </div>
    );
}

export default ProfilePictures;