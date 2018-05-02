

import { sources } from './actionTypes';
import { hostname } from './../config';

export const actionsCreator = {
    selected: (data) => {
        return {
            type: sources.selected,
            data: data
        };
    },
    get: () => (dispatch) => {
        const url = `${hostname}/api/sources`;
        return (
            new Promise((resolve = () => 0, reject = () => 0) => {
                fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .then(({ data }) => {
                        console.log(data);
                        dispatch({
                            type: sources.set,
                            data: data
                        });
                        resolve(data)
                    })
                    .catch((err) => console.log(err))
            })
        );
    },
    details: (image) => (dispatch) => {
        const url = `${hostname}/api/sources/details/${image}`;
        return (
            new Promise((resolve = () => 0, reject = () => 0) => {
                fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'include'
                })
                    .then((response) => response.json())
                    .then(({ details }) => {
                        resolve(details.length);
                    })
                    .catch((err) => console.log(err.message))
            })
        );
    },
    upload: (data) => (dispatch) => {
        const url = `${hostname}/api/sources/upload`;
        return (
            new Promise((resolve = () => 0, reject = () => 0) => {
                fetch(url, {
                    method: "POST",
                    body: data
                })
            })
        );
    },
    download: (image, page = 1) => (
        `${hostname}/api/sources/view/${image}?page=${page}`
    ),
    setFile: (image) => ({
        type: sources.setFile,
        data: image
    })
}