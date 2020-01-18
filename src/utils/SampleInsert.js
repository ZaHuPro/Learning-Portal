/* eslint-disable no-console */
import faker from 'faker';
import DB from '../providers/Database';

async function BulkInsert() {
    const Exams = [];
    const Subjects = [];
    const Topics = [];
    const Chapters = [];
    const Questions = [];
    const QuesTypes = ['EASY', 'MEDIUM', 'HARD'];
    const ansserAre = ['a', 'b', 'c', 'd'];

    for (let i = 1; i <= 2; i += 1) {
        Exams.push({ title: faker.name.jobType() });
    }
    const createdExams = await DB.models.Exam.bulkCreate(Exams);
    await createdExams.map((exam) => {
        Subjects.push({ title: faker.name.jobTitle(), exam_id: exam.id });
        Subjects.push({ title: faker.name.jobTitle(), exam_id: exam.id });
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
        Chapters.push({ title: faker.commerce.productName(), topic_id: top.id });
        Chapters.push({ title: faker.commerce.productName(), topic_id: top.id });
        return top;
    });

    const createdChapter = await DB.models.Chapter.bulkCreate(Chapters);
    await createdChapter.map((chap) => {
        Questions.push({
            title: faker.lorem.sentence(5, 10),
            option_a: faker.commerce.productName(),
            option_b: faker.commerce.productMaterial(),
            option_c: faker.address.state(),
            option_d: faker.commerce.product(),
            answer: faker.helpers.randomize(ansserAre),
            type: faker.helpers.randomize(QuesTypes),
            chapter_id: chap.id,
        });
        Questions.push({
            title: faker.lorem.sentence(5, 10),
            option_a: faker.commerce.productName(),
            option_b: faker.commerce.productMaterial(),
            option_c: faker.address.state(),
            option_d: faker.commerce.product(),
            answer: faker.helpers.randomize(ansserAre),
            type: faker.helpers.randomize(QuesTypes),
            chapter_id: chap.id,
        });
        return chap;
    });
    const createdQues = await DB.models.Question.bulkCreate(Questions);
    return createdQues;
}

export default BulkInsert;
