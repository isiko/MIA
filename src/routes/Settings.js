import { React, Component } from 'react'
import Headline from '../components/Headline'
import SettingModifyer from '../components/Settings/SettingModifyer'
import SettingsSection from '../components/Settings/SettingsSection';

export default class Settings extends Component {

  //TOOD Replace this with call to Backend
  settings = [
    {
      name: "Test Section",
      settings: [
        {
          name: "Binary Test Setting",
          currentSetting: 0,
          options: [
            "Off",
            "On",
          ]
        },
        {
          name: "Test Setting 2",
          currentSetting: 0,
          options: [
            "Option 1",
            "Option 2",
            "Option 3",
          ]
        }
      ]
    },
    {
      name: "Test Section",
      settings: [
        {
          name: "Test Setting",
          currentSetting: 0,
          options: [
            "Option 1",
            "Option 2",
            "Option 3",
          ]
        },
        {
          name: "Test Setting 2",
          currentSetting: 0,
          options: [
            "Option 1",
            "Option 2",
            "Option 3",
          ]
        }
      ]
    }
  ]

  changeSetting(name, section, index) {
    console.log(`Set "${name}" of section "${section}" to ${index}`);

    //TODO Communicate this to Backend
  }

  constructor(props) {
    super(props);

    this.state = {}

    this.changeSetting = this.changeSetting.bind(this)
  }

  render() {
    return (
      <div>
        <Headline text={"Settings"} />

        <div className='p-5 font-semibold text-white'>
          {
            this.settings.slice(0).map((section, index) => {
              return <SettingsSection settings={section.settings} title={section.name} key={index} index={index} callback={this.changeSetting} />
            })
          }
        </div>
      </div>
    )
  }
}
