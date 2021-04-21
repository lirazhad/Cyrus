import { DATE, ANSWERS, VIEWS } from './constants';

export const sortQuestions = (sortType: string, questions: any[]) => {

    if(questions.length === 0) {
        return;
    }
    switch(sortType) {
        case DATE: 
          return questions.slice().sort((a, b) => a.creation_date - b.creation_date);

        case ANSWERS: 
          return questions.slice().sort((a, b) => a.answer_count - b.answer_count);

        case VIEWS: 
          return questions.slice().sort((a, b) => a.view_count - b.view_count); 
    }
}