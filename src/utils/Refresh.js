/* eslint-disable no-console */
import faker from 'faker';
import DB from '../providers/Database';

function getArrayRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function BulkInsert() {
    const Exams = [];
    const Subjects = [];
    const Topics = [];
    const Chapters = [];
    const Questions = [];
    const QuesTypes = ['EASY', 'MEDIUM', 'HARD'];
    const ansserAre = ['option_1', 'option_2', 'option_3', 'option_4'];

    for (let i = 1; i <= 2; i += 1) {
        Exams.push({ title: faker.commerce.department() });
    }
    const createdExams = await DB.models.Exam.bulkCreate(Exams);
    await createdExams.map((exam) => {
        Subjects.push({ title: faker.commerce.department(), exam_id: exam.id });
        Subjects.push({ title: faker.commerce.department(), exam_id: exam.id });
        return exam;
    });

    const createdSubject = await DB.models.Subject.bulkCreate(Subjects);
    await createdSubject.map((sub) => {
        Topics.push({ title: faker.commerce.department(), subject_id: sub.id });
        Topics.push({ title: faker.commerce.department(), subject_id: sub.id });
        return sub;
    });

    const createdTopic = await DB.models.Topic.bulkCreate(Topics);
    await createdTopic.map((top) => {
        Chapters.push({ title: faker.commerce.department(), topic_id: top.id });
        Chapters.push({ title: faker.commerce.department(), topic_id: top.id });
        return top;
    });

    const createdChapter = await DB.models.Chapter.bulkCreate(Chapters);
    await createdChapter.map((chap) => {
        Questions.push({
            title: faker.lorem.lines(),
            option_1: faker.lorem.word(),
            option_2: faker.lorem.word(),
            option_3: faker.lorem.word(),
            option_4: faker.lorem.word(),
            answer: getArrayRandomElement(ansserAre),
            type: getArrayRandomElement(QuesTypes),
            chapter_id: chap.id,
        });
        Questions.push({
            title: faker.lorem.lines(),
            option_1: faker.lorem.word(),
            option_2: faker.lorem.word(),
            option_3: faker.lorem.word(),
            option_4: faker.lorem.word(),
            answer: getArrayRandomElement(ansserAre),
            type: getArrayRandomElement(QuesTypes),
            chapter_id: chap.id,
        });
        return chap;
    });
    const createdQues = await DB.models.Question.bulkCreate(Questions);
    return createdQues;
}

export default BulkInsert;
