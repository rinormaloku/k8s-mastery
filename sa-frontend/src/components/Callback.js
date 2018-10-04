import React, { Component } from 'react';
import { CircularProgress } from "material-ui";

export default class Callback extends Component {
    render() {
        const style = {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
        };

        return (
            <div style={style}>
                <CircularProgress/>
            </div>
        );
    }
}
