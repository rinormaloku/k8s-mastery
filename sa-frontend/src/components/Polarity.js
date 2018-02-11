import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Polarity extends Component {

    propTypes = {
        sentence: PropTypes.string.isRequired,
        polarity: PropTypes.number.isRequired
    };

    render() {
        const green = Math.round((this.props.polarity + 1) * 128);
        const red = 255 - green;
        const textColor = {
            backgroundColor: 'rgb(' + red + ', ' + green + ', 0)',
            padding: '15px'
        };

        return <div style={textColor}>"{this.props.sentence}" has polarity of {this.props.polarity} </div>
    }
}

export default Polarity;