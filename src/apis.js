import {toast} from 'react-toastify'

export function request(path, {method = "GET", data = null, token=null}){
    return fetch(path,{
        method,
        headers: {
            "Authorization": token? `Token ${token}` : '',
            "Content-Type": "application/json"
        },
        body: method !== "GET" && method !== "DELETE"? JSON.stringify(data) : null
    }).then(response => {
        if(response.ok){
            if (method === "DELETE"){
                return true
            }
            return response.json()
        }

        return response.json()
            .then((json) => {
                if(response.status === 400){
                    const errors = Object.keys(json)
                        .map((error) => `${(json[error].join(" "))}`);
                    throw new Error(errors.join(" "));
                }
                throw new  Error(JSON.stringify(json));
            }).catch((e) => {
                if(e.name === "SyntaxError"){
                    throw new Error(response.statusText);
                }
                throw new Error(e);
            })
    }).catch((error) => {
        toast(error.message, {type: "error"})
    })
}

export function signIn(username, password){
    return request("/auth/token/login/", {
        data: {username, password},
        method: "POST"
    })
}

export function register(username, password){
    return request("/auth/users/", {
        data: {username, password},
        method: "POST",
    })
}

export function fetchPlaces(token){
    return request("/api/places/", {token});
}

export function addPlace(data, token){
    return request('/api/places/', {data, token, method: 'POST'})
}

export function uploadImage(image){
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qrmenu_photos");

    return fetch("https://api.cloudinary.com/v1_1/geekx/image/upload", {
        method: "POST",
        body: formData,
    }).then((response) => {
        return response.json();
    });
}

export function fetchPlace(id, token){
    return request(`/api/places/${id}`, { token });
}

export function addCategory(data, token){
    return request("/api/categories/", { data, token, method: "POST" });
}

export function addMenuItem(data, token){
    return request("/api/menu_items/", { data, token, method: "POST" });
}

export function updateMenuItem(id, data, token){
    return request(`/api/menu_items/${id}`, { data, token, method: "PATCH" });
}

export function removePlace(id, token){
    return request(`/api/places/${id}/`, { token, method: "DELETE" });
}

export function removeCategory(id, token){
    return request(`/api/categories/${id}/`, { token, method: "DELETE" });
}

export function removeMenuItem(id, token){
    return request(`/api/categories/${id}/`, { token, method: "DELETE" });
}

export function updatePlace(id, data, token){
    return request(`/api/places/${id}/`, {data, token, method: "PATCH" });
}

export function createPaymentIntent(data, token){
    return request(`/api/create_payment_intent/`, {data, token, method: "POST" });
}

export function fetchOrders(placeId, token){
    return request(`/api/orders/?place=${placeId}`, { token });
}

export function completeOrder(orderId, data, token){
    return request(`/api/orders/${orderId}`, { data, token, method:"PATCH" });
}