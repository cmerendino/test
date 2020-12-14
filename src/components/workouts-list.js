import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service'
import { useCookies } from 'react-cookie';

function WorkoutList(props) {

    const [token] = useCookies(['wo-token']);

    const workoutClicked = workout => evt => {
        props.workoutClicked(workout)
    }
    const editClicked = workout => {
        props.editClicked(workout);
    }
    const removeClicked = workout => {
        API.deleteWorkout(workout.id, token['wo-token'])
            .then(() => props.removeClicked(workout))
            .catch(error => console.log())       
    }

    return (
        <div>
            { props.workouts && props.workouts.map(workout => {
                return (
                    <div key={workout.id} className="workout-item">
                        <h2 onClick={workoutClicked(workout)}>{workout.title}</h2>
                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(workout)}/>
                        <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(workout)}/>
                        </div>
                    )
            })}
        </div>
        )
}

export default WorkoutList;