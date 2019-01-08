import React from 'react';
import PropTypes from 'prop-types';
import { AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { Accordion } from './primereact-accordion/Accordion.jsx';
import { initialState, UPDATE_CURRENT_INCIDENT } from '../public/scripts/state';
import { getIconForType } from '../public/scripts/incidents';

const typeFieldName = `${getIconForType('Type')}Incident type`;
const addressFieldName = `${getIconForType('Address')}Where?`;
const inDangerFieldName = `${getIconForType('Person')}Danger`;
const detailFieldName = `${getIconForType('Detail')}What?`;

const fieldNameToRowHeaderMap = {};
fieldNameToRowHeaderMap[typeFieldName] = 'TYPE';
fieldNameToRowHeaderMap[inDangerFieldName] = 'LIVES_AT_RISK';
fieldNameToRowHeaderMap[detailFieldName] = 'DETAILS';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
    this.text = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSubmitAux();
  }

  /* eslint-disable class-methods-use-this */
  handleSubmitAux() {
    const { rowData, update } = this.props;
    // console.log(this.props);
    // console.log({ rowData });
    const dbColHeaderName = fieldNameToRowHeaderMap[rowData.prop];
    // console.log({ dbColHeaderName });
    const incident = {};
    incident[dbColHeaderName] = this.input.current.value;
    // console.log({ incident });
    update(incident);
    this.input.current.blur();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={this.input} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

/* eslint-disable react/no-multi-comp */
class Incidents extends React.PureComponent {
  static incidentData(data, isActive) {
    const { ID: key } = data;
    const street = data.ADDRESS_STREET || '';
    const streetAndNumber = data.ADDRESS_STREET_NB ? `${data.ADDRESS_STREET_NB} ${street}` : street;
    const streetAddress = data.ADDRESS_CITY ? `${streetAndNumber}, ${data.ADDRESS_CITY}` : streetAndNumber;
    const title = data.DETAILS ? data.DETAILS.split('\n')[0] : data.TYPE || 'New Incident';
    const titleAddress = streetAndNumber || 'Unknown Address';
    const name = (
      <div>
        {isActive ? <b>{title}</b> : title}<br />
        <span className="incidentTitleAddress">{titleAddress}</span>
      </div>
    );
    const livesAtRisk = data.LIVES_AT_RISK >= 0 ? `${data.LIVES_AT_RISK} lives at risk` : '';
    const calls = data.calls || [];
    const tableData = [
      { prop: typeFieldName, val: data.TYPE },
      { prop: addressFieldName, val: streetAddress },
      { prop: inDangerFieldName, val: livesAtRisk },
      { prop: detailFieldName, val: data.DETAILS },
    ];
    const { mergeProposed } = data;
    return {
      key,
      name,
      tableData,
      mergeProposed,
      calls,
    };
  }

  static tabHeaderClass(isBottomCandidate, isTopCandidate) {
    if (isTopCandidate) {
      return 'mergeSelectionTop';
    } if (isBottomCandidate) {
      return 'mergeSelectionMiddle';
    }
    return null;
  }

  static tabContentClass(isBottomCandidate, isTopCandidate) {
    if (isTopCandidate) {
      return 'mergeSelectionMiddle';
    } if (isBottomCandidate) {
      return 'mergeSelectionBottom';
    }
    return null;
  }

  static callList(calls) {
    return (
      <ul className="callList">
        <li><b style={{ color: 'black' }}>Related Calls:</b></li>
        { calls.map((call) => {
          const time = call.TIME;
          const timeFormat = `today, ${time}`;
          return (
            <li>
              <a href="#" className="transcriptLink">
                <span role="img" aria-label="phone">📞</span>
                {call.PHONE_NUMBER}
              </a>
              &nbsp; <span className="callListDate">{timeFormat}</span>
            </li>
          );
        }) }
      </ul>
    );
  }

  constructor(props) {
    super(props);
    const { activeIndex } = props;
    this.state = { activeIndex };
    this.inputTextEditor = this.inputTextEditor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { activeIndex } = nextProps;
    this.setState({ activeIndex });
    return nextProps;
  }

  inputTextEditor(props, update) {
    return <TextInput {...props} update={update} />;
  }

  mergeButtons() {
    const { onMergeAccept, onMergeReject } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <div className="mergeButtons">
          <Button label="Cancel" className="mergeButton" onClick={onMergeReject} />
          <Button label="Merge" className="mergeButton" onClick={onMergeAccept} />
        </div>
      </div>
    );
  }

  render() {
    const { incidents, activeIndex, updateCurrentIncident } = this.props;
    // true if previous element has mergeProposed = true
    let isNewerMergePart = false;
    let listIndex = incidents.length - 1;
    const elements = incidents
      .map(child => Incidents.incidentData(child, activeIndex.includes(listIndex--)))
      .map((data) => {
        const {
          key,
          name,
          tableData,
          mergeProposed,
          calls,
        } = data;
        const tab = (
          <AccordionTab
            headerClassName={Incidents.tabHeaderClass(mergeProposed, isNewerMergePart)}
            contentClassName={Incidents.tabContentClass(mergeProposed, isNewerMergePart)}
            key={key}
            header={name}
          >
            { mergeProposed ? this.mergeButtons() : null }
            <DataTable value={tableData} editable>
              <Column key="prop" field="prop" />
              <Column key="val" field="val" editor={props => this.inputTextEditor(props, updateCurrentIncident)} />
            </DataTable>
            { (calls.length === 0) ? null : Incidents.callList(calls) }
          </AccordionTab>
        );
        isNewerMergePart = mergeProposed;
        return tab;
      })
      .reverse();
    return (
      <Accordion
        className="incidentsContainer"
        multiple
        // eslint-disable-next-line react/destructuring-assignment
        activeIndex={this.state.activeIndex}
        onTabChange={e => this.setState({ activeIndex: e.index })}
      >
        {elements}
      </Accordion>
    );
  }
}

const updateCurrentIncident = incident => dispatch => (
  dispatch({ type: UPDATE_CURRENT_INCIDENT, incident })
);

Incidents.propTypes = {
  incidents: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeIndex: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMergeAccept: PropTypes.func.isRequired,
  onMergeReject: PropTypes.func.isRequired,
  updateCurrentIncident: PropTypes.func.isRequired,
};

// Use a container component to manage state for the incidents view. Seems like overkill
// right now. Will hopefully pay off later.
const mapStateToProps = (state = initialState) => {
  const { incidents } = state;
  const activeIndex = state.mergingIncidents ? [0, 1] : [0];
  return { incidents, activeIndex };
};
const mapDispatchToProps = {
  updateCurrentIncident,
};
const IncidentsContainer = connect(mapStateToProps, mapDispatchToProps)(Incidents);
export default IncidentsContainer;
