export class API{
    static loginUser(body) {
        return fetch(`http://127.0.0.1:8000/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`http://127.0.0.1:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static getWorkouts(token) {
        return fetch("http://127.0.0.1:8000/api/workouts/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(resp => resp.json())
    }

    static updateWorkout(wk, body, token) {
        return fetch(`http://127.0.0.1:8000/api/workouts/${wk}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static createWorkout(body, token) {
        return fetch(`http://127.0.0.1:8000/api/workouts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }


    static deleteWorkout(wk_id, token) {
        return fetch(`http://127.0.0.1:8000/api/workouts/${wk_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }
}