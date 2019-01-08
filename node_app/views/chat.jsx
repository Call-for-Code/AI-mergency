import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollPanel } from 'primereact/scrollpanel';
import { initialState } from '../public/scripts/state';
import { getIconForType } from '../public/scripts/incidents';

class Message {
  constructor(speaker, text, isComplete = false, entities = []) {
    this.speaker = speaker;
    this.text = text;
    this.isComplete = isComplete;
    this.entities = entities;
  }
}

const TimeLine = ({ time }) => (
  <li className="timeLine">
    <span>{time}</span>
  </li>
);


const formatText = (text, entities) => {
  let from = 0;
  let elements = [];
  entities
    .filter(entity => entity.type !== 'Address_Street' && entity.type !== 'Address_St_Number')
    .forEach((entity) => {
      const icon = getIconForType(entity.type);
      elements = [
        ...elements,
        <span key={from}>{text.substring(from, entity.start)}</span>,
        <span key={entity.start} className="entity">
          {icon}{entity.text}
        </span>,
      ];
      from = entity.end;
    });
  elements = [
    ...elements,
    <span key={from}>{text.substring(from, text.length)}</span>,
  ];
  return <div>{elements}</div>;
};

const speakerMap = {
  u1: 0,
  u2: 1,
};

// Map the server generated id of a message to its position in the chat.
const id2idxMap = {};

const newSpeakerState = {
  index: -1,
  isActive: false,
};

class Chat extends Component {
  constructor() {
    super();
    this.addMessage = this.addMessage.bind(this);
    this.state = {
      messages: [],
      u1: newSpeakerState,
      u2: newSpeakerState,
    };
    this.clear = this.clear.bind(this);
    this.time = null;
  }

  componentWillReceiveProps(nextProps) {
    const {
      speaker,
      text,
      isComplete,
      id,
    } = nextProps.message;
    this.addMessage(speaker, text, isComplete, id);
  }

  componentDidUpdate() {
    const { messages } = this.state;
    if (messages && messages.length > 0) {
      const node = this[`ref-${messages.length - 1}`].current;
      if (node) {
        // The parent of the parent is the scroll container. Make that scroll down
        // as we add elements.
        node.parentNode.parentNode.scrollTop = node.offsetTop;
      }
    }
  }

  setTime(time) {
    this.time = time;
  }

  clear() {
    this.setState({
      messages: [],
      u1: newSpeakerState,
      u2: newSpeakerState,
    });
  }

  updateMessageById(id, text, entities) {
    const idx = id2idxMap[id];
    this.updateMessageText(idx, text, entities);
  }

  updateMessageText(idx, text, entities) {
    if (idx) {
      this.setState((prevState) => {
        const { messages: oldMsgs } = prevState;
        const { speaker } = oldMsgs[idx];
        const message = new Message(speaker, text, true, entities);
        const messages = oldMsgs.slice();
        messages.splice(idx, 1, message);
        return { messages };
      });
    }
  }

  addMessage(speaker, text, isComplete, id) {
    // If we're called before a message has been set the speaker will be empty
    if (speaker === '') return;
    // Initialize the new message
    const speakerId = speakerMap[speaker];
    const message = new Message(speakerId, text);
    // Handle active vs new bubble
    const chatState = this.state[speaker]; // eslint-disable-line react/destructuring-assignment
    if (chatState.isActive) {
      // If the transcript is complete for this chat bubble, reset the state accordingly.
      if (isComplete) {
        message.isComplete = true;
        this.setState(() => {
          // On complete, we get an ID from the server
          id2idxMap[id] = chatState.index;
          const stateUpdate = {};
          stateUpdate[speaker] = newSpeakerState;
          return stateUpdate;
        });
      }
      this.setState((prevState) => {
        const { messages: oldMsgs } = prevState;
        const messages = oldMsgs.slice();
        // We must take care to not set a message that has already been set to complete
        // to incomplete again. If we don't do this, the chat bubbles may flash briefly.
        if (messages[chatState.index]) {
          if (messages[chatState.index].isComplete) {
            message.isComplete = true;
          }
        }
        messages.splice(chatState.index, 1, message);
        return { messages };
      });
    } else {
      this.setState((prevState) => {
        const { messages: oldMsgs } = prevState;
        if (oldMsgs.length > 0) {
          oldMsgs[oldMsgs.length - 1].isComplete = true;
        }
        const speakerState = { index: oldMsgs.length, isActive: true };
        const stateUpdate = {};
        stateUpdate[speaker] = speakerState;
        const messages = [...oldMsgs, message];
        return { ...stateUpdate, messages };
      });
    }
  }

  render() {
    const { messages } = this.state;
    const items = messages.map((m, i) => {
      const ongoing = (m.isComplete) ? '' : 'incomplete';
      const refName = `ref-${i}`;
      this[refName] = React.createRef();
      return (
        <li
          className={['transcriptItem', (m.speaker === 1 ? 'left' : 'right'), ongoing].join(' ')}
          key={i}
          ref={this[refName]}
        >{formatText(m.text, m.entities)}
        </li>
      );
    });
    return (
      <ScrollPanel className="transcriptContainer">
        <ul className="transcript">
          {(this.time !== null) ? <TimeLine time={this.time} /> : null}
          {items}
        </ul>
      </ScrollPanel>
    );
  }
}

Chat.propTypes = {
  message: PropTypes.shape({
    speaker: PropTypes.string,
    text: PropTypes.string,
    isComplete: PropTypes.bool.isRequired,
    clearTranscript: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state = initialState) => {
  const { message } = state;
  return { message };
};
export default connect(mapStateToProps, null, null, { withRef: true })(Chat);
