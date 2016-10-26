import { connect } from 'react-redux';
import StateReader from './state/reader';

/**
 * connectWithReader passes a state reader to `mapStateToProps` function
 * instead of a raw state object.
 */
export default function connectWithReader(mapStateToProps, ...args) {
  const mapReaderToProps = (state, props) => {
    const reader = new StateReader(state);
    return mapStateToProps(reader, props);
  };

  return connect(...[mapReaderToProps, ...args]);
}
