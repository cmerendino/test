import React, { useState, useEffect } from 'react';
import './App.css';
import WorkoutList from './components/workouts-list';
import WorkoutDetails from './components/workout-details';
import WorkoutForm from './components/workout-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/hooks';


function App() {


    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editedWorkout, setEditedWorkout] = useState(null);
    const [token, setToken, deleteToken] = useCookies(['wo-token'])
    const [data, loading, error] = useFetch();

    useEffect(() => {
        setWorkouts(data);
       
    }, [data])

    useEffect(() => {
        if (!token['wo-token']) window.location.href = '/'
    }, [token])


    const loadWorkout = workout => {
        setSelectedWorkout(workout);
        setEditedWorkout(null)
    }

    const editClicked = workout => {
        setEditedWorkout(workout);
        setSelectedWorkout(null)
    }

    const updatedWorkout = workout => {
        const newWorkouts = workouts.map(wk => {
            if (wk.id === workout.id) {
                return workout;
            }
            return wk;
        })
        setWorkouts(newWorkouts)
    }

    const newWorkout = () => {
        setEditedWorkout({title:'', description:'', user:'', categrory:''})
    }

    const newWorkoutCreated = workout => {
        const newWorkouts = [...workouts, workout];
        setWorkouts(newWorkouts)
    }

    const removeClicked = workout => {
        const newWorkouts = workouts.filter(wk => wk.id !== workout.id)
        setWorkouts(newWorkouts)
    }

    const logoutUser = () => {
        deleteToken(['wo-token'])
    }

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error: {error}</h1>
  return (
    <div className="App">
        <header className="App-header">
              <h1>Workout</h1>
              <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
        </header>
          <div className="layout">
              <div>
                  <WorkoutList workouts={workouts}
                      workoutClicked={loadWorkout}
                      editClicked={editClicked}
                      removeClicked={removeClicked} />
                  <button onClick={newWorkout}>Create Workout</button>
            </div>
              <WorkoutDetails workout={selectedWorkout} updateWorkout={loadWorkout} />
              {editedWorkout ? <WorkoutForm workout={editedWorkout} updatedWorkout={updatedWorkout} newWorkoutCreated={newWorkoutCreated}/> : null}
              
          </div>      
    </div>
  );
}

export default App;
