
import {useEffect} from 'react';
import  {ConnectPost, ConnectGet, ConnectPath} from '../../pages/api/connect'
let dogBarkingBuffer = null;
let context = new AudioContext();

export const AudioContext = () => {
    console.log('AudioContext')
}

export const Audioinit = (url) => {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
        dogBarkingBuffer = buffer;
    }, onError);
    }
    request.send();
}




export const getMedia = async (contraints) => {
    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia(contraints);
    } catch (err) {
        console.error(err);
    }

}