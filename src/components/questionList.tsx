import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextApp } from '../components/common/textApp';

interface QuestionListProps {
    onItemPress: (item: any) => void
    questionList: any
    isLightMode: boolean
}

const QuestionList = ({ onItemPress, questionList, isLightMode }: QuestionListProps) => {

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => onItemPress(item)}>
                <View style={styles.itemContainer}>
                    <TextApp lightMode={isLightMode}>{item.title}</TextApp>
                </View>
            </TouchableOpacity>)
    }

    return (
        <View style={[styles.listContentStyle]}>
            <View style={styles.listContainer}>
                <FlatList
                    data={questionList}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{
                        backgroundColor: isLightMode ? 'black' : 'white',
                        height: 1
                    }} />
                    }
                    keyExtractor={(_, index) => index.toString()} />
            </View>
        </View>
    )
}

export default QuestionList;

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 10,
        flex: 1
    },
    listContentStyle: {
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 2
    },
    itemContainer: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        justifyContent: 'center'
    }
})