import React from 'react';
import WeaponList from './WeaponList';
import ComparedWeapon from './ComparedWeapon';
import SpecComparison from './SpecComparison';
import { bindMethodContext } from './util';

const COLOR_VALUES = ['#f68728', '#1618da'];

export default class Bukikurabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glancedWeapon: undefined,
      selectedWeapons: []
    };

    bindMethodContext(this);
  }

  glanceAtWeapon(id) {
    const { selectedWeapons } = this.state;
    if (selectedWeapons[0] && selectedWeapons[0].id === id) {
      return;
    }
    const weapon = this.props.weapons.filter(w => w.id === id)[0];
    this.setState({ glancedWeapon: weapon });
  }

  glanceAwayWeapon() {
    this.setState({ glancedWeapon: undefined });
  }

  selectWeapon() {
    const { glancedWeapon, selectedWeapons } = this.state;
    if (glancedWeapon) {
      this.setState({
        selectedWeapons: selectedWeapons.concat(glancedWeapon),
        glancedWeapon: undefined
      });
    }
  }

  unselectWeapon() {
    const { selectedWeapons } = this.state;
    selectedWeapons.pop();
    this.setState({ selectedWeapons });
  }

  constructComparedWeapons() {
    const { glancedWeapon, selectedWeapons } = this.state;
    return selectedWeapons.concat(glancedWeapon || []);
  }

  handleWeaponItemClick() {
    if (this.state.glancedWeapon) {
      this.selectWeapon();
    }
    else {
      this.unselectWeapon();
    }
  }

  render() {
    const { weapons } = this.props;
    const [weapon1, weapon2] = this.constructComparedWeapons();
    const shouldCompare = this.state.selectedWeapons.length === 2;

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
