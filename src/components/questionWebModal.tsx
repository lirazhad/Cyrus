import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Text,
    ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SCREEN_HEIGHT } from '../constants';

interface QuestionModalProps {
    visible: boolean
    uri: string
    closeModal: () => void
}

const QuestionModal = ({ visible, uri, closeModal }: QuestionModalProps) => {

    const [loader, setLoader] = useState<boolean>(true)

    return (
        <Modal
            useNativeDriver={true}
            visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.closeButton}>{'x'}</Text>
                    </TouchableOpacity>
                </View>
                <WebView
                    onLoad={() => setLoader(false)}
                    style={styles.webview}
                    source={{ uri }} />

                {loader && <View style={styles.loader}>
                    <ActivityIndicator size="small" />
                </View>}

            </View>
        </Modal>
    )
};

export default QuestionModal

const styles = StyleSheet.create({
    header: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16
    },
    modalContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: SCREEN_HEIGHT,
        borderWidth: 1,
        borderRadius: 16,
        alignSelf: 'center',
        marginTop: 90
    },
    webview: {
        flex: 1
    },
    closeButton: {
        fontSize: 20,
        paddingHorizontal: 16,
    },
    loader: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})