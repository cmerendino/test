export class API{
    static loginUser(body) {
        return fetch(`https://woapi.brtechservice.com/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static registerUser(body) {
        return fetch(`https://woapi.brtechservice.com/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static getWorkouts(token) {
        return fetch("https://woapi.brtechservice.com/api/workouts/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
            .then(resp => resp.json())
    }

    static updateWorkout(wk, body, token) {
        return fetch(`https://woapi.brtechservice.com/api/workouts/${wk}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static createWorkout(body, token) {
        return fetch(`https://woapi.brtechservice.com/api/workouts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        }).then(resp => resp.json())
    }

    static deleteWorkout(wk_id, token) {
        return fetch(`https://woapi.brtechservice.com/api/workouts/${wk_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
    }
}
