const API = 'http://localhost:8000/api';

export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not get restaurants',
            };
        });
};

export const getImages = () => {
    return fetch(`${API}/images`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not get restaurants',
            };
        });
};

export const getImagesByUser = (userId, token) => {
    return fetch(`${API}/images/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not get restaurants',
            };
        });
};

export const uploadImages = (userId, token, images) => {
    return fetch(`${API}/image/create/${userId}/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId,
            images,
            private: false,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not get images',
            };
        });
};

export const deleteImage = (userId, token, imageId) => {
    return fetch(`${API}/image/${imageId}/${userId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not delete image',
            };
        });
};

export const deleteAllImagesByUser = (userId, token) => {
    return fetch(`${API}/image/${userId}/`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not delete image',
            };
        });
};

export const updateImage = (userId, token, imageId, isPrivate) => {
    return fetch(`${API}/image/${imageId}/${userId}/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            isPrivate,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return {
                error: 'Could not delete image',
            };
        });
};
