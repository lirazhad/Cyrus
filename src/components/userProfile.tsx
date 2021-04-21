import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextApp } from '../components/common/textApp';
import { UserDetails } from '../types';

interface UserProfileProps{
    userDetails: UserDetails
    lightMode: boolean
  } 

const UserProfile = ({ lightMode, userDetails }): UserProfileProps => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.imageStyle}
                    resizeMode={'contain'}
                    source={{ uri: userDetails.userImage }} />
            </View>
            <View style={styles.textContainer}>
                <TextApp
                    style={styles.textStyle}
                    lightMode={lightMode}>
                    {`Name: ${userDetails.name}`}
                </TextApp>
                <TextApp
                    style={styles.textStyle}
                    lightMode={lightMode}>
                    {`Reputation: ${userDetails.reputation}`}
                </TextApp>
                <TextApp
                    style={styles.textStyle}
                    lightMode={lightMode}>
                    {`Accept Rate: ${userDetails.acceptRate}`}
                </TextApp>
            </View>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 120,
        height: 120
    },
    imageStyle: {
        width: 120,
        height: 120
    },
    textContainer: {
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'center'

    },
    textStyle: {
        margin: 8
    }
})
