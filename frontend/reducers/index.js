import { combineReducers } from 'redux';
import { repo } from './repo';
import {
  glancedWeaponID,
  selectedWeaponIDs,
  mainWeaponIDs
} from './weapon-ids';

export default combineReducers({
  glancedWeaponID,
  selectedWeaponIDs,
  mainWeaponIDs,
  repo
});
