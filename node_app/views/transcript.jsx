import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollPanel } from 'primereact/scrollpanel';

class Transcript extends PureComponent {
  render() {
    const { value } = this.props;
    return (
      <ScrollPanel style={{ width: '100%', height: '600px' }}>
        <div style={{ padding: '1em', lineHeight: '1.5' }}>
          {value.completed}
          <br /><br />
          <b>{value.current.speaker}:</b> {value.current.text}
        </div>
      </ScrollPanel>
    );
  }
}
export default Transcript;

Transcript.propTypes = {
  value: PropTypes.shape({
    complete: PropTypes.string,
    current: PropTypes.object,
  }).isRequired,
};
