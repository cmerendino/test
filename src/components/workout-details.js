import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

function WorkoutDetails(props) {

    const [highlighted, sethighlighted] = useState(-1);
    const [token] = useCookies(['wo-token']);

    const wk = props.workout;

    const highlightRate = high => evt => {
        sethighlighted(high)
    }

    const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/workouts/${wk.id}/rate_workout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['wo-token']}`
            },
            body: JSON.stringify( {stars: rate + 1} )
        })
            .then( () => getDetails())
            .catch(error => console.log(error))
    }

    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/workouts/${wk.id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token['wo-token']}`
            }
        })
            .then(resp => resp.json())
            .then(resp => props.updateWorkout(resp))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {wk ? (
                <div>
                    <h1>{wk.title}</h1>
                    <h2>{wk.description}</h2>
                 
                    <FontAwesomeIcon icon={faGrinBeamSweat} className={wk.avg_rating > 0 ? 'white' : 'grey'} />
                    <FontAwesomeIcon icon={faGrinBeamSweat} className={wk.avg_rating > 1 ? 'white' : 'grey'} />
                    <FontAwesomeIcon icon={faGrinBeamSweat} className={wk.avg_rating > 2 ? 'white' : 'grey'} />
                    <FontAwesomeIcon icon={faGrinBeamSweat} className={wk.avg_rating > 3 ? 'white' : 'grey'} />
                    <FontAwesomeIcon icon={faGrinBeamSweat} className={wk.avg_rating > 4 ? 'white' : 'grey'} />
                    ({ props.workout.no_of_ratings})
                    <div className="rate-container">
                        <h2>Rate Workout</h2>
                        {[...Array(5)].map((e, i) => {
                            return <FontAwesomeIcon key={i} icon={faGrinBeamSweat} className={highlighted > i - 1 ? 'yellow' : 'grey'}
                                onMouseEnter={highlightRate(i)}
                                onMouseLeave={highlightRate(-1)}
                                onClick={rateClicked(i)}
                            />
                        })}
                    </div>
                </div>
                ) : null }
        </React.Fragment>
        )
}

export default WorkoutDetails;