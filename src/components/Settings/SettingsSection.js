import React from 'react'
import SettingModifyer from './SettingModifyer'

export default function SettingsSection({ title, settings, callback, sectionIndex}) {
    return (
        <>
            <h1 className={`text-2xl  ${sectionIndex===0 ? 'mb-5':'my-5'}`}> { title } </h1>
            <div className="grid grid-cols-2 gap-4 content-start text-center text-white">
                {
                    settings.map((setting, settingIndex) => 
                        <SettingModifyer
                            options={setting.options}
                            selectedIndex={setting.currentSetting}
                            name={setting.name}
                            callback={(settingIndex, selectedIndex) => callback(settingIndex, sectionIndex, selectedIndex)}
                            key={settingIndex}
                            index={settingIndex}
                            notBinary={setting.notBinary}/>
                    )
                }
            </div>
        </>
    )
}
