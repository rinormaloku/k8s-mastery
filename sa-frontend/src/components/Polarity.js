import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Feedback from "./Feedback";

class Polarity extends Component {

    static propTypes = {
        sentence: PropTypes.string.isRequired,
        polarity: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        const green = Math.round((this.props.polarity + 1) * 128);
        const red = 255 - green;
        this.polarityColor = {
            backgroundColor: 'rgb(' + red + ', ' + green + ', 0)',
        };
    }

    render() {
        return <div style={this.polarityColor}>
            <p>"{this.props.sentence}" has polarity of {this.props.polarity}</p>
            <Feedback {...this.props}/>
        </div>
    }
}

export default Polarity;