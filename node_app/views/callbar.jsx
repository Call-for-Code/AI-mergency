import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const endCallIconUrl = 'https://png.icons8.com/color/50/000000/end-call.png';
const acceptCallIconUrl = 'https://png.icons8.com/color/50/000000/phone.png';
const incomingCallIconUrl = 'https://png.icons8.com/ios/50/000000/ringer-volume.png';
const recordingCallIconUrl = 'https://png.icons8.com/color/50/000000/audio-wave.png';
const doneCallIconUrl = 'https://png.icons8.com/color/50/000000/checked.png';
const replayCallIconUrl = 'https://png.icons8.com/color/50/000000/replay.png';

const incomingState = 'incoming';
export const activeState = 'active';
export const finishedState = 'done';
const daveState = 'dave';

const CallBarItem = (props) => {
  const { number, state, onClick, isCallActive } = props;
  let stateIconUrl = '';
  let actionIconUrl = '';
  switch (state) {
    case incomingState:
      stateIconUrl = incomingCallIconUrl;
      actionIconUrl = acceptCallIconUrl;
      break;
    case activeState:
      stateIconUrl = recordingCallIconUrl;
      actionIconUrl = endCallIconUrl;
      break;
    case daveState:
      stateIconUrl = recordingCallIconUrl;
      break;
    case finishedState:
      stateIconUrl = doneCallIconUrl;
      actionIconUrl = replayCallIconUrl;
      break;
    default: // do nothing
  }
  const rightElement = (state === daveState)
    ? <span className="rightIcon">→ Chris</span>
    : <img className="rightIcon" src={actionIconUrl} alt="n/a" />;
  const disabled = (state === daveState) || (isCallActive && state === incomingState);
  return (
    <button
      name={number}
      type="button"
      disabled={disabled}
      className="callElement"
      onClick={onClick}
    >
      <span style={{ whiteSpace: 'nowrap' }}>
        <img src={stateIconUrl} alt="n/a" />&nbsp;{number}&nbsp;{rightElement}
      </span>
    </button>
  );
};

/* eslint-disable react/prefer-stateless-function */
class CallBar extends Component {
  constructor(props) {
    super(props);
    const { onClick } = props;
    this.state = {
      isCallActive: false,
      calls: [
        { key: '1', number: '451-029-0932', state: daveState, onClick: () => {} },
        { key: '2', number: '239-698-1283', state: incomingState, onClick, callId: 1 },
        { key: '3', number: '060-044-0994', state: incomingState, onClick, callId: 2 },
        { key: '4', number: '036-496-9021', state: incomingState, onClick: () => {} },
        { key: '5', number: '663-644-1163', state: incomingState, onClick: () => {} },
        { key: '6', number: '293-202-8216', state: incomingState, onClick: () => {} },
        { key: '7', number: '953-711-4607', state: incomingState, onClick: () => {} },
      ],
    };
  }

  setCallIsActive(isCallActive) {
    this.setState({ isCallActive });
  }

  updateCallProperties(index, update) {
    const { state } = update;
    if (state === finishedState) {
      this.setState((oldState) => {
        const { calls } = oldState;
        const newCalls = calls.slice();
        newCalls.splice(index, 1);
        const newState = { calls: newCalls };
        return newState;
      });
    } else {
      this.setState((oldState) => {
        const { calls } = oldState;
        const oldCall = calls[index];
        const newCall = { ...oldCall, ...update };
        const newCalls = calls.slice();
        newCalls.splice(index, 1, newCall);
        const newState = { calls: newCalls };
        return newState;
      });
    }
  }

  render() {
    const { calls, isCallActive } = this.state;
    let numIncoming = 0;
    let numActive = 0;
    calls.forEach((call) => {
      switch (call.state) {
        case incomingState:
          numIncoming += 1;
          break;
        case activeState:
          numActive += 1;
          break;
        case daveState:
          numActive += 1;
          break;
        default:
          break;
      }
    });
    const plural = (numActive === 1) ? '' : 's';
    const activeString = `${numActive} call${plural} active`;
    const waitingString = `${numIncoming} callers waiting:`;
    const nodes = calls.map((call, index) => {
      const {
        key,
        number,
        state,
        onClick,
        callId,
      } = call;
      const onClickHandler = (callId)
        ? () => onClick(callId, number, index)
        : onClick;
      return {
        state,
        isFake: !callId,
        content: <CallBarItem
          key={key}
          number={number}
          state={state}
          onClick={onClickHandler}
          isCallActive={isCallActive}
        />,
      };
    });
    const activeNodes = nodes.filter(node => [daveState, activeState].includes(node.state));
    const incomingNodes = nodes.filter(node => node.state === incomingState && !node.isFake);
    const bgIncomingNodes = nodes.filter(node => node.state === incomingState && node.isFake);
    const { children } = this.props;
    /* eslint-disable react/destr ucturing-assignment */
    return (
      <div className="callbar">
        {activeNodes.map(node => node.content)}
        {/* <div className="callStatus active">{activeString}</div> */}
        <div className="callStatus waiting">{waitingString}</div>
        {incomingNodes.map(node => node.content)}
        <div className="notImplemented">
          {bgIncomingNodes.map(node => node.content)}
        </div>
        <div className="resetButtonContainer">
          {children}
        </div>
      </div>
    );
    /* eslint-enable react/destructuring-assignment */
  }
}

CallBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { callBarVisible } = state;
  const visible = (callBarVisible === true);
  return { visible };
};


export default connect(mapStateToProps, null, null, { withRef: true })(CallBar);
