import React from 'react';
import WeaponList from './WeaponList';
import ComparedWeapon from './ComparedWeapon';
import SpecComparison from './SpecComparison';
import connectWithReader from '../connect-with-reader';
import { actions } from '../actions';
import { bindMethodContext } from './util';

const {
  GLANCE_AT_WEAPON,
  GLANCE_AWAY_WEAPON,
  SELECT_WEAPON,
  UNSELECT_WEAPON
} = actions;

const COLOR_VALUES = ['#f68728', '#1618da'];

class Bukikurabe extends React.Component {
  constructor(props) {
    super(props);
    bindMethodContext(this);
  }

  glanceAtWeapon(id) {
    this.props.dispatch(GLANCE_AT_WEAPON(id));
  }

  glanceAwayWeapon() {
    this.props.dispatch(GLANCE_AWAY_WEAPON());
  }

  selectWeapon(id) {
    this.props.dispatch(SELECT_WEAPON(id));
  }

  unselectWeapon() {
    this.props.dispatch(UNSELECT_WEAPON());
  }

  constructComparedWeapons() {
    const { glancedWeapon, selectedWeapons } = this.props;
    return selectedWeapons.concat(glancedWeapon || []);
  }

  handleWeaponItemClick(id) {
    if (this.props.glancedWeapon) {
      this.selectWeapon(id);
    }
    else {
      this.unselectWeapon();
    }
  }

  render() {
    const { weapons = [] } = this.props;
    const [weapon1, weapon2] = this.constructComparedWeapons();
    const shouldCompare = this.props.selectedWeapons.length === 2;

    return (
      <main className="main-container">
        <div className="compared-weapons">
          <ComparedWeapon weapon={weapon1} color={COLOR_VALUES[0]} />
          <ComparedWeapon weapon={weapon2} color={COLOR_VALUES[1]} />
        </div>
        <div className="weapon-list-container">
          <WeaponList
            weapons={weapons}
            onMouseEnter={this.glanceAtWeapon}
            onMouseLeave={this.glanceAwayWeapon}
            onClick={this.handleWeaponItemClick}
          />
        </div>
        <SpecComparison
          weapon1={weapon1}
          weapon2={weapon2}
          colors={COLOR_VALUES}
          shouldCompare={shouldCompare}
          onClose={this.unselectWeapon}
        />
      </main>
    );
  }
}

Bukikurabe.Container = connectWithReader(reader => {
  return {
    weapons: reader.getMainWeapons(),
    glancedWeapon: reader.getGlancedWeapon(),
    selectedWeapons: reader.getSelectedWeapons()
  };
})(Bukikurabe);

export default Bukikurabe;
