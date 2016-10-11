import React from 'react';
import WeaponList from './WeaponList';
import ComparedWeapon from './ComparedWeapon';
import SpecComparison from './SpecComparison';
import { bindMethodContext } from './util';

// XXX: choicesがひどい。
// - ホバー時に表示するステートと、実際に選択されているステートは
// 分けた方がいい？

export default class Bukikurabe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: []
    };

    bindMethodContext(this);
  }

  showWeapon(id) {
    const { choices } = this.state;
    if (choices.length === 2) {
      return;
    }
    if (choices.length > 0 && choices[choices.length - 1].id === id) {
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

  unselectWeapon() {
    const { choices } = this.state;
    choices.pop();
    this.setState({ choices });
  }

  handleWeaponItemClick(id) {
    const { choices } = this.state;
    if (choices.length === 0) {
      return;
    }

    const lastChoice = choices[choices.length - 1];
    if (lastChoice.selected && lastChoice.id === id) {
      this.unselectWeapon();
    }
    else {
      this.selectWeapon();
    }
  }

  render() {
    const { weapons } = this.props;
    const [target1, target2] = this.state.choices;
    const weapon1 = target1 ? weapons.filter(w => w.id == target1.id)[0] : undefined;
    const weapon2 = target2 ? weapons.filter(w => w.id == target2.id)[0] : undefined;
    const shouldCompare = target1 && target1.selected && target2 && target2.selected;
    return (
      <main className="main-container">
        <div className="compared-weapons">
          <ComparedWeapon weapon={weapon1} />
          <ComparedWeapon weapon={weapon2} />
        </div>
        <div className="weapon-list-container">
          <WeaponList
            weapons={weapons}
            onMouseEnter={this.showWeapon}
            onMouseLeave={this.hideWeapon}
            onClick={this.handleWeaponItemClick}
          />
        </div>
        <SpecComparison
          weapon1={weapon1}
          weapon2={weapon2}
          shouldCompare={shouldCompare}
          onClose={this.unselectWeapon}
        />
      </main>
    );
  }
}
