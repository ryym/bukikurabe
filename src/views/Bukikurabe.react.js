import React from 'react';
import WeaponList from './WeaponList';
import ComparedWeapon from './ComparedWeapon';
import SpecComparison from './SpecComparison';

export default class Bukikurabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: []
    };

    this.showWeapon = this.showWeapon.bind(this);
    this.hideWeapon = this.hideWeapon.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this);
  }

  showWeapon(id) {
    const { choices } = this.state;
    if (choices.length === 2) {
      return;
    }
    const newChoicies = choices.concat({ id, selected: false });
    this.setState({
      choices: newChoicies
    });
  }

  hideWeapon() {
    const { choices } = this.state;
    if (choices.length > 0 && !choices[choices.length - 1].selected) {
      choices.pop();
      this.setState({ choices });
    }
  }

  selectWeapon() {
    const { choices } = this.state;
    if (choices.length > 0) {
      choices[choices.length - 1].selected = true;
      this.setState({ choices });
    }
  }

  render() {
    const { weapons } = this.props;
    const [target1, target2] = this.state.choices;
    const weapon1 = target1 ? weapons.filter(w => w.id == target1.id)[0] : undefined;
    const weapon2 = target2 ? weapons.filter(w => w.id == target2.id)[0] : undefined;
    const shouldCompare = target1 && target1.selected && target2 && target2.selected;
    return (
      <main>
        <div style={{ display: 'inline-block', width: '300px' }}>
          <ComparedWeapon weapon={weapon1} />
          <ComparedWeapon weapon={weapon2} />
        </div>
        <div style={{ display: 'inline-block' }}>
          <WeaponList
            weapons={weapons}
            onMouseEnter={this.showWeapon}
            onMouseLeave={this.hideWeapon}
            onClick={this.selectWeapon}
          />
        </div>
        <SpecComparison weapon1={weapon1} weapon2={weapon2} shouldCompare={shouldCompare} />
      </main>
    );
  }
}
