import { React, Component } from 'react'
import Headline from '../components/Headline'
import SettingsSection from '../components/Settings/SettingsSection';

export default class Settings extends Component {

  //TOOD Replace this with call to Backend

  changeSetting(settingIndex, sectionIndex, selectedIndex) {
    window.settings.set(settingIndex, sectionIndex, selectedIndex)
  }

  constructor(props) {
    super(props);

    this.state = {
      settings: []
    }

    this.changeSetting = this.changeSetting.bind(this)
  }

  componentDidMount() {
    window.settings.get().then((settings) => {
      this.setState({
        settings: settings
      })
    })
  }

  render() {
    return (
      <div>
        <Headline text={"Settings"} />

        <div className='p-5 font-semibold text-white'>
          {
            this.state.settings.slice(0).map((section, index) => {
              return <SettingsSection settings={section.settings} title={section.name} key={index} sectionIndex={index} callback={this.changeSetting} />
            })
          }
        </div>
      </div>
    )
  }
}
