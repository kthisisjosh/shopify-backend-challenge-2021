const API = "http://localhost:8080/api"

export const getUser = (userId, token) => {

    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return {
                "error": "Could not get restaurants"
            };
        })
};

export const getImages = () => {

    return fetch(`${API}/images`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return {
                "error": "Could not get restaurants"
            };
        })
};

export const getImagesByUser = (userId, token) => {

    return fetch(`${API}/images/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return {
                "error": "Could not get restaurants"
            };
        })
};

export const uploadImages = (userId, token, images) => {

    return fetch(`${API}/image/create/${userId}/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            userId,
            images,
        })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return {
                "error": "Could not get images"
            };
        })
};

