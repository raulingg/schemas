const mongoose = require('mongoose/browser');
const { ReviewerSurveySchema, ReviewQuestionSchema } = require('../../')(mongoose);

describe('ReviewerSurveySchema', () => {
  it('should fail validation when missing fields are provided', () => {
    const doc = new mongoose.Document({}, ReviewerSurveySchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values', (done) => {
    const question = new mongoose.Document({}, ReviewQuestionSchema);
    const doc = new mongoose.Document({
      questions: [question._id],
      version: '2.0.0',
    }, ReviewerSurveySchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
