import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextApp } from './textApp';
import { COLOR_PRIMARY } from '../../constants'

interface ButtonItem{
  callback: () => void,
  buttonText: string
}
interface TabControllerProps {
  buttons: ButtonItem[],
  isLightMode: boolean
}

export const TabController = ({ buttons, isLightMode }: TabControllerProps) => {

  const [isSelected, setIsSelected] = useState<number>(0)

  const renderTabs = () => {
    return buttons.map((button: ButtonItem, index: number) => {
      return (
        <TouchableOpacity
          key={index.toString()}
          style={[styles.itemContainer, index === isSelected && { backgroundColor: COLOR_PRIMARY }]}
          onPress={() => {
            setIsSelected(index);
            button.callback();
          }}>
          <View>
            <TextApp style={{ fontSize: 12 }} lightMode={isLightMode}>{button.buttonText}</TextApp>
          </View>
        </TouchableOpacity>
      )
    })
  }

  return (
    <View style={styles.container}>
      {renderTabs()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row'
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
