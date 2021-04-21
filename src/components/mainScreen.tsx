import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Text,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextApp } from '../components/common/textApp';
import { TabController } from '../components/common/tabController';
import { DATE, ANSWERS, VIEWS, COLOR_BLACK, COLOR_WHITE, COLOR_PRIMARY } from '../constants';
import { UserDetails } from '../types';
import { getQuestions } from '../service/serverConnection';
import { sortQuestions } from '../utils';
import UserProfile from './userProfile';
import QuestionList from '../components/questionList';
import QuestionModal from '../components/questionWebModal';

const MainScreen = () => {

  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>('');

  const [userDetails, setUserDetails] = useState<UserDetails>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionsFilter, setQuestionsFilter] = useState<string>(DATE);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalUri, setModalUri] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const filteredList = useMemo(() => sortQuestions(questionsFilter, questions),
    [questionsFilter, questions])

  const textColor = () => isLightMode ? { color: COLOR_BLACK } : { color: COLOR_WHITE }

  const getProfileById = async (id: string) => {
    try {
      setIsLoading(true)
      const questionsRes = await getQuestions(id);
      setQuestions(questionsRes);
      setUserDetails(
        {
          userImage: questionsRes[0].owner.profile_image,
          name: questionsRes[0].owner.display_name,
          reputation: questionsRes[0].owner.reputation,
          acceptRate: questionsRes[0].owner.accept_rate
        }
      )
    } catch (e) {
      Alert.alert(e);
    } finally {
      setIsLoading(false)
    }
  }

  const questionsSection = () => {
    return (
      <View style={styles.questionsSection}>
        <View style={styles.userDetailsContainer}>
          <UserProfile lightMode={isLightMode} userDetails={userDetails} />
        </View>

        <View style={styles.tabControllerContainer}>
          <View style={styles.questionWrapper}>
            <TextApp lightMode={isLightMode}>{'Questions:'}</TextApp>
          </View>
          <View style={styles.tabWrapper}>
            <TabController
              buttons={[
                { callback: () => setQuestionsFilter(DATE),
                  buttonText: DATE },
                { callback: () => setQuestionsFilter(ANSWERS),
                  buttonText: ANSWERS },
                { callback: () => setQuestionsFilter(VIEWS),
                  buttonText: VIEWS }
              ]}
              isLightMode={isLightMode} />
          </View>
        </View>

        <View style={styles.questionsList}>
          <QuestionList
            onItemPress={(item) => {
              setModalUri(item.link);
              setShowModal(true);
            }}
            questionList={filteredList}
            isLightMode={isLightMode} />
        </View>

        <View style={styles.footer}>
          <TextApp lightMode={isLightMode}>
            {`Total of ${questions.length} questions found`}
          </TextApp>
        </View>

      </View>
    )
  }

  return (
    <View style={
      [styles.container, isLightMode ?
        { backgroundColor: COLOR_WHITE } :
        { backgroundColor: COLOR_BLACK }]}>

      <QuestionModal closeModal={() => setShowModal(false)} visible={showModal} uri={modalUri} />

      <View style={styles.header}>
        <View style={styles.switchContainer}>
          <Switch
            onValueChange={() => setIsLightMode(!isLightMode)}
            value={isLightMode} />
          <TextApp lightMode={isLightMode}>
            {isLightMode ? 'Light Mode' : 'Dark Mode'}
          </TextApp>
        </View>
      </View>

      <View style={styles.titleWrapper}>
        <TextApp lightMode={isLightMode}>
          {'Get Stack Overflow posts'}
        </TextApp>
      </View>

      <View style={styles.userIdContainer}>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.userIdInput, textColor()]}
            onChangeText={(text: string) => setUserId(text)}
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={() => getProfileById(userId)}

            value={userId}
            placeholder={'user Id'}
            placeholderTextColor={isLightMode ? COLOR_BLACK : COLOR_WHITE} />
        </View>

        {isLoading ? <ActivityIndicator size="small" color={COLOR_PRIMARY} /> :
          <View style={styles.closeButtonWrapper}>
            <TouchableOpacity
              onPress={() => setUserId('')}>
              <Icon name="times-circle" size={20} color={COLOR_PRIMARY} />
            </TouchableOpacity>
          </View>
        }

      </View>

      {questions.length > 0 && questionsSection()}
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    height: 80,
    width: '100%',
    alignItems: 'flex-end',
    padding: 16
  },
  switchContainer: {
    padding: 8,
    alignItems: 'center'
  },
  titleWrapper: {
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userIdContainer: {
    height: 80,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userIdInput: {
    height: 40,
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 20
  },
  inputWrapper: {
    flexDirection: 'row',
    flex: 4
  },
  closeButtonWrapper: {
    flex: 1
  },
  closeButton: {
    width: 20,
    height: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey'
  },
  closeText: {
    color: COLOR_WHITE
  },
  questionsSection: {
    flex: 4
  },
  tabControllerContainer: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrapper: {
    flex: 3,
    alignItems: 'flex-start',
  },
  questionWrapper: {
    flex: 2,
    paddingHorizontal: 8,
    alignItems: 'flex-end'
  },
  userDetailsContainer: {
    flex: 3,
    width: '100%'
  },
  questionsList: {
    flex: 6,
    width: '100%'
  },
  footer: {
    alignItems: 'center'
  }
})
