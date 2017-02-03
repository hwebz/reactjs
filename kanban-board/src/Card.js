import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CheckList from './CheckList';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';
import { Link } from 'react-router';

let titlePropType = (props, propName, componentName) => {
    if (props[propName]) {
        let value = props[propName];
        if (typeof value !== 'string' || value.length > 80) {
            return new Error(
                `${propName} in ${componentName} is longer than 80 characters`
            );
        }
    }
}

const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            status: props.status
        };
    },
    endDrag(props) {
        props.cardCallbacks.persistCardDrag(props.id, props.status);
    }
}

const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId, props.id);
    }
}

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
}

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class Card extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;

        let cardDetails;
        if (this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    {/*{this.props.description}*/}
                    <span dangerouslySetInnerHTML={{__html:marked(this.props.description)}} />
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} taskCallbacks={this.props.taskCallbacks} />
                </div>
            );
        };

        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };
        return connectDropTarget(connectDragSource(
            <div className="card">
                <div style={sideColor} />
                {/* &#9998; is the HTML entity for the utf-8 pencil character */}
                <div className="card__edit"><Link to={'/edit/'+this.props.id}>&#9998;</Link></div>
                {/*<div className="card__title" onClick={()=>this.setState({showDetails: !this.state.showDetails})}>{this.props.title}</div>*/}
                <div className={this.state.showDetails ? "card__title card__title--is-open" : "card__title"} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                {/*<div className="card_details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>*/}
                <ReactCSSTransitionGroup transitionName="toggle" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                    {cardDetails}
                </ReactCSSTransitionGroup>
            </div>
        ));
    }
};

Card.propTypes = {
    id: PropTypes.number,
    title: titlePropType,
    description: PropTypes.string,
    color: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
    cardCallbacks: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
//export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);

// class FocusText extends Component {
//     handleClick() {
//         // Explicitly focus the text input using the raw DOM API
//         this.refs.myTextInput.focus();
//     }

//     render() {
//         // The ref attribute adds a reference to the component to
//         // this.refs when the component is mounted.
//         return (
//             <div>
//             <input type="text" ref="myTextInput" />
//             <input type="button" value="Focus the text input" onClick={this.handleClick.bind(this)} />
//             </div>
//         );
//     }
// }

// export default FocusText;