import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';

function WorkoutForm(props) {
    const wk = props.workout;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const user = wk.user
    const category = wk.category
    const [token] = useCookies(['wo-token']);

    useEffect(() => {
        setTitle(props.workout.title)
        setDescription(props.workout.description)
    }, [props.workout])

    const updateClicked = () => {
        API.updateWorkout(wk.id, { title, description, user, category }, token['wo-token'])
            .then(resp => props.updatedWorkout(resp))
        .catch( error => console.log(error))
    }

    const createClicked = () => {
        API.createWorkout({ title, description, user: '1', category: '2' }, token['wo-token'])
            .then(resp => props.newWorkoutCreated(resp))
            .catch(error => console.log(error))
    }

    const isDisabled = title.length === 0 || description.length === 0;
    
    return (
        <React.Fragment>
            {wk ? (
                <div>
                <label htmlFor="title">Title</label><br/>
                    <input id="title" type="text" placeholder="Title" value={title} onChange={evt => setTitle(evt.target.value)}/><br/>
            <label htmlFor="description">Description</label><br/>
                    <textarea id="description" type="text" placeholder="Description" value={description} onChange={evt => setDescription(evt.target.value)} /><br />

                    {props.workout.id ?
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>
                    }
                </div>
            ) : null}
        </React.Fragment>
        )
}

export default WorkoutForm;