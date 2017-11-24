import React from 'react';
import { database } from '../Firebase';
import { connect } from 'react-redux';
import { updateUserEvents } from '../Actions/UserActions';
class Card extends React.Component {
    toggleRegistration() {
      let ev_id = this.props.event.id;
      let user_events = this.props.userData[this.props.uid]['events'] || {};
      if (ev_id in user_events) {
        delete user_events[ev_id];
        this.props.updateUserEvents(this.props.uid, user_events);
      }
      else {
        user_events[ev_id] = ev_id;
        this.props.updateUserEvents(this.props.uid, user_events);
      }
    }
    isRegistered(event_id) {
      let user_events = this.props.userData[this.props.uid]['events'] || {};
      return event_id in user_events;
    }
    render() {
        const divClass = {
            'paddingTop': '4%',
        }
        
        const cardBackground = {
            'backgroundColor': '#868e96',
            'borderColor': '#868e96',
        }

        const body_text_style = {
            'fontSize': '1.2em',
        }

        function buildAlignCSS(val) {
            const align = {
                'float': val,
            }
            return align;
        }
        return (
            <div className="row" style={divClass}>
                <div className="col-md-8 offset-md-2 card card-inverse" style={cardBackground}>
                    <div className="card-header text-center">
                        <h4 className="card-title"> {this.props.event.title}</h4>
                    </div>
                    <div className="card-body body-text" style={body_text_style}>
                        <p className='card-text'> 
                            <a style={buildAlignCSS('left')}> {this.props.event.location}  </a>
                            <br/>
                            <a style={buildAlignCSS('left')}>From: {this.props.event.stime} -  To: {this.props.event.etime}</a>
                            <br/>
                            <a style={buildAlignCSS('right')}> {this.props.event.date}</a>
                        </p>
                        <br />
                        <button disabled={(this.isRegistered(this.props.event.id))}
                                onClick={this.toggleRegistration.bind(this)}>
                            Register
                        </button>
                        <button disabled={!(this.isRegistered(this.props.event.id))}
                                onClick={this.toggleRegistration.bind(this)}>
                            Un-register
                        </button>
                        <p className="card-text"> {this.props.event.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    const checkedUser = state.user || {};
    return {
        uid: checkedUser.uid,
        userData: state.dbUsers,
        events: state.events };
}
export default connect(mapStateToProps, { updateUserEvents })(Card);