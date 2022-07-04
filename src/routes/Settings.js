import { React, Component } from 'react'
import Headline from '../components/Headline'
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
          name: "Non binary Test Setting",
          currentSetting: 0,
          notBinary: true,
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

  changeSetting(settingIndex, sectionIndex, selectedIndex) {
    console.log(`Set "${this.settings[sectionIndex].settings[settingIndex].name}" of section "${this.settings[sectionIndex].name}" to ${selectedIndex}`);

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
