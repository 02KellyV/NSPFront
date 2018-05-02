

import { auth } from './actionTypes';
import { hostname } from '../config';
import { Exception } from 'handlebars';

export const actionsCreator = {
    setSession: (data) => ({
        type: auth.setSession,
        data: data
    }),
    signUp: (data) => (dispatch) => {
        const url = `${hostname}/api/auth/sign-up`;
        return (
            new Promise((resolve = () => 0, reject = () => 0) => {
                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        response.json()
                            .then(({ data, error }) => {
                                if (response.ok) {
                                    dispatch(actionsCreator.setSession(data));
                                    resolve(data);
                                    return;
                                }
                                const err = new Exception("Ocurrio un error inesperado");
                                err.errors = error;
                                throw err;
                            })
                            .catch((err) => reject(err))
                    })
                    .catch((err) => reject(err))
            })
        );
    },
    signIn: (data) => (dispatch) => {
        const url = `${hostname}/api/auth/sign-in`;
        return (
            new Promise((resolve = () => { }, reject = () => { }) => {
                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                        response.json()
                            .then(({ data, error }) => {
                                if (response.ok) {
                                    dispatch(actionsCreator.setSession(data));
                                    resolve(data);
                                    return;
                                }
                                const err = new Exception("Ocurrio un error inesperado");
                                err.errors = error;
                                throw err;
                            })
                            .catch((err) => reject(err))
                    })
                    .catch((err) => reject(err))
            })
        );
    },
    logout: (data) => (dispatch) => {
        const url = `${hostname}/api/auth/logout`;
        return (
            new Promise((resolve = () => { }, reject = () => { }) => {
                fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'include'
                })
                    .then((response) => {
                        response.json()
                            .then(({ data, error }) => {
                                if (response.ok) {
                                    dispatch(actionsCreator.setSession(null));
                                    resolve(data);
                                    return;
                                }
                                const err = new Exception("Ocurrio un error inesperado");
                                err.errors = error;
                                throw err;
                            })
                            .catch((err) => reject(err))
                    })
                    .catch((err) => reject(err))
            })
        );
    },
    session: (data) => (dispatch) => {
        const url = `${hostname}/api/auth/session`;
        return (
            new Promise((resolve = () => { }, reject = () => { }) => {
                fetch(url, {
                    method: "GET",
                    mode: 'cors',
                    credentials: 'include'
                })
                    .then((response) => {
                        const content_type = response.headers.get("content-type");
                        if (content_type === "application/json") {
                            response.json()
                                .then(({ data, error }) => {
                                    if (response.ok) {
                                        dispatch(actionsCreator.setSession(data));
                                        resolve(data);
                                    } else if (error) {
                                        reject(new Exception(error));
                                    } else {
                                        reject(new Exception("Error desconocido"));
                                    }
                                })
                                .catch((err) => reject(err))
                        }
                        if (response.ok) {
                            resolve(data);
                        } else {
                            reject(new Exception("Error desconocido"));
                        }
                    })
                    .catch((err) => reject(err))
            })
        );
    }
}