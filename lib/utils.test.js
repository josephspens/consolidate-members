const chai = require('chai');
const expect = chai.expect;

const Utils = require('./utils');

describe('Utils', () => {
  describe('checkDataSet', () => {
    it('is a function', () => {
      expect(Utils.checkDataSet).to.be.a('function');
    });

    it('does not return a value', () => {
      expect(Utils.checkDataSet('source', 'meetup')).to.be.undefined;
    });

    it('throws an error if the data set name is missing', () => {
      let error;
      try { Utils.checkDataSet(); }
      catch (exception) { error = exception; }
      finally {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Need to specify the data set name.');
      }
    });

    it('throws an error if the data set is missing', () => {
      let error;
      try { Utils.checkDataSet('source'); }
      catch (exception) { error = exception; }
      finally {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('No source data set provided.');
      }
    });

    it('throws an error if the data set is not a member of valid data sets', () => {
      let error;
      try { Utils.checkDataSet('source', 'foo'); }
      catch (exception) { error = exception; }
      finally {
        expect(error).to.be.an('error');
        expect(error.message).to.equal(`The source data set is unknown. Please choose one of the following: ${Utils.validDataSources.join(', ')}.`);
      }
    });
  });
});
