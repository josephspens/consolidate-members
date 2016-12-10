const chai = require('chai');
const expect = chai.expect;

const Utils = require('./utils');

describe('Meetup Utils', () => {
  describe('renameEmailProperty', () => {
    it('is a function', () => {
      expect(Utils.renameEmailProperty).to.be.a('function');
    });

    it('returns an object', () => {
      expect(Utils.renameEmailProperty()).to.be.an('object');
    });

    it('removes the property defined by `emailHeader`', () => {
      const row = { [Utils.emailHeader]: 'foo@bar.com' };
      expect(Utils.renameEmailProperty(row)).not.to.have.property(Utils.emailHeader);
    });

    it('adds a property `Email` if it has a property defined by `emailHeader`', () => {
      const row = { [Utils.emailHeader]: 'foo@bar.com' };
      expect(Utils.renameEmailProperty(row)).to.have.property('Email');
    });

    it('does not add a property `Email` if it does not have a property defined by `emailHeader`', () => {
      expect(Utils.renameEmailProperty()).not.to.have.property('Email');
    });

    it('assigns the value of the proerty defined by `emailHeader` to `Email`', () => {
      const row = { [Utils.emailHeader]: 'foo@bar.com' };
      expect(Utils.renameEmailProperty(row)).to.have.property('Email', 'foo@bar.com');
    });

    it('assigns an email address if it is valid', () => {
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'test@foo.com' })).to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'my.email.account@something.net' })).to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'my.email.account@something.net.com' })).to.have.property('Email');
    });

    it('does not assign an email address if it is invalid', () => {
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'NA' })).not.to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'N/A' })).not.to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: undefined })).not.to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: '' })).not.to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'somthing.com' })).not.to.have.property('Email');
      expect(Utils.renameEmailProperty({ [Utils.emailHeader]: 'foo@bar' })).not.to.have.property('Email');
    });
  });

  describe('nonEmptyEmails', () => {
    it('is a function', () => {
      expect(Utils.nonEmptyEmails).to.be.a('function');
    });

    it('returns a boolean', () => {
      expect(Utils.nonEmptyEmails()).to.be.a('boolean');
    });

    it('returns false if the object does not have an `Email` property', () => {
      expect(Utils.nonEmptyEmails()).not.to.be.ok;
      expect(Utils.nonEmptyEmails({ Name: 'something' })).not.to.be.ok;
    });

    it('returns true if the object has an `Email` property', () => {
      expect(Utils.nonEmptyEmails({ Email: 'foo@bar.com '})).to.be.ok;
    });
  });

  describe('splitName', () => {
    it('is a function', () => {
      expect(Utils.splitName).to.be.a('function');
    });

    it('returns an object', () => {
      expect(Utils.splitName()).to.be.an('object');
    });

    it('removes the `Name` property', () => {
      expect(Utils.splitName({ Name: 'foo' })).not.to.have.property('Name');
    });

    it('creates a `First Name` property if `Name` is defined', () => {
      expect(Utils.splitName({ Name: 'foo' })).to.have.property('First Name');
    });

    it('does not create a `First Name` or `Last Name` property if `Name` is not defined', () => {
      const name = Utils.splitName();
      expect(name).not.to.have.property('First Name');
      expect(name).not.to.have.property('Last Name');
    });

    it('creates a `Last Name` property if `Name` has more than one word', () => {
      expect(Utils.splitName({ Name: 'foo bar' })).to.have.property('Last Name');
      expect(Utils.splitName({ Name: 'foo' })).not.to.have.property('Last Name');
    });

    it('assigns the last word of `Name` to `Last Name`', () => {
      expect(Utils.splitName({ Name: 'foo bar' })).to.have.property('Last Name', 'bar');
    });

    it('assigns the first n-1 words of `Name` to `First Name`', () => {
      expect(Utils.splitName({ Name: 'foo bar' })).to.have.property('First Name', 'foo');
      expect(Utils.splitName({ Name: 'foo bar biz' })).to.have.property('First Name', 'foo bar');
    });
  });

  describe('sanitizeOutput', () => {
    it('is a function', () => {
      expect(Utils.sanitizeOutput).to.be.a('function');
    });

    it('returns an array', () => {
      expect(Utils.sanitizeOutput()).to.be.an('array');
    });

    it('removes the first row', () => {
      expect(Utils.sanitizeOutput([{}])).to.have.length(0);
    });

    it('splits names into first and last', () => {
      const items = [{}, {
        Name: 'foo bar',
        Email: 'foo@bar.com'
      }];
      const outputItem = Utils.sanitizeOutput(items)[0];
      expect(outputItem).to.have.property('First Name', 'foo');
      expect(outputItem).to.have.property('Last Name', 'bar');
    });

    it('renames the email properties', () => {
      const items = [{}, { [Utils.emailHeader]: 'foo@bar.com' }];
      const outputItem = Utils.sanitizeOutput(items)[0];
      expect(outputItem).to.have.property('Email', 'foo@bar.com');
      expect(outputItem).not.to.have.property(Utils.emailHeader);
    });

    it('removes items without emails', () => {
      const items = [{}, { Name: 'foo bar' }];
      const outputItem = Utils.sanitizeOutput(items);
      expect(outputItem).to.be.empty;
    });
  });
});
