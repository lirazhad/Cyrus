import React from 'react';
import { Text } from 'react-native';

interface TextProps {
  lightMode: boolean
  children?: any
  style?: any
}  

export const TextApp = ({lightMode, children, style}: TextProps) => {
  return (
      <Text style={[style, lightMode? {color: 'black'}: {color: 'white'}]}>
        {children}
      </Text>

  )
}

