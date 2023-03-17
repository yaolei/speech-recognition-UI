import axios from 'axios'

// use django back side
// const host = process.env.NEXT_PUBLIC_HOST

// use flask back side
const host = process.env.NEXT_PUBLIC_HOST_FLASK

// access for Django
// const headers = {
//     'Content-Type':'application/json',
//     };


const headers = {
    'Content-Type':'application/json',
    };
const blobHeaders = {
    'Content-Type': `multipart/form-data`,
}
export const ConnectPost = async(url, params, isBlob=false) => {
    let rep = null;
    const header = isBlob? blobHeaders:headers;
    try {
        rep = await axios.post(url,
             params, 
             {header},
        ).then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
    } catch (err) {
        console.error(err)
    }
    return rep;
}

export const ConnectGet = async(url) => {
    try {
        rep = await axios.get(url,
             {headers: {'Content-Type': 'application/json'}}
        ), then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
    } catch (err) {
        console.error(err)
    }
    return rep;
}
export const ConnectPath = (apiFuc) => {
    return `${host}/${apiFuc}`;
}