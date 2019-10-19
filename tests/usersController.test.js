const chai = require("chai");
const should = chai.should();

const mongoose = require("mongoose");

const Advertisement = require("../models/Advertisement");

const User = require("../models/User");

const userCntr = require("../controllers/usersController");

chai.should();

const  deletePicture = require('../helpers/advertisements');
jest.mock('../helpers/advertisements');

const response = jest.fn(arg => {});
const next = jest.fn(args => {});
const send = jest.fn(args => {});

const usr = {
  name: "tester@tester.com",
  description: "sdf",
  available: 3,
  city: 2,
  status: 3,
  phone: "sdfsdf",
  email: "tester@tester.com"
};

describe("usersController", () => {

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();

  });

  /**
   * updateUser()
   */
  test("should updateUser() OK", async done => {
    let mockReq = {
      user: { email: "eee@ff.com" },
      body: usr
    };
    const updt = jest.fn(() =>
      Promise.resolve(usr)
    );
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.updateUser(mockReq, { send }, next);
    expect(next).not.toHaveBeenCalled();
    expect(updt).toHaveBeenCalledTimes(1);

    expect(send).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: "tester@tester.com",
        email: "tester@tester.com"
      })
    );
    done();
  });

  test("should updateUser() ERROR", async done => {
    let mockReq = {
      user: { email: "eee@ff.com" },
      body: usr
    };
    const updt = jest.fn(() =>
      Promise.resolve(null)
    );
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.updateUser(mockReq, { send }, next);
    expect(next).not.toHaveBeenCalled();
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(
      expect.objectContaining({ errors: "error" })
    );
    done();
  });


  /**
   * Delete photo
   */

  test("should deletePhoto() OK", async done => {
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'}
    };
    const updt = jest.fn(() =>
      Promise.resolve({...usr, work_photos: ['34534534534346']})
    );
    const send = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);
    const dltPhoto = jest.fn((pict) => Promise.resolve());
    deletePicture.deletePhoto = dltPhoto;

    await userCntr.deletePhoto(mockReq, { send }, next);
    expect(next).not.toHaveBeenCalled();
    expect(updt).toHaveBeenCalled();
    expect(dltPhoto).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(
      expect.objectContaining({...usr, work_photos: ['34534534534346']})
    );
    done();
  });


  test("should deletePhoto() Error", async done => {
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'}
    };
    const updt = jest.fn(() =>
      Promise.resolve(null)
    );
    const send = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);
    const dltPhoto = jest.fn((pict) => Promise.resolve());
    deletePicture.deletePhoto = dltPhoto;

    await userCntr.deletePhoto(mockReq, { send }, next);
    expect(next).not.toHaveBeenCalled();
    expect(updt).toHaveBeenCalledTimes(1);
    expect(dltPhoto).not.toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(
      expect.objectContaining({errors: 'error'})
    );
    done();
  });

  test("should deletePhoto() Catch Error", async done => {
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'}
    };
    const updt = jest.fn(() =>
      Promise.reject({error: 'Error in catch'})
    );
    const send = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);
    const dltPhoto = jest.fn((pict) => Promise.resolve());
    deletePicture.deletePhoto = dltPhoto;

    await userCntr.deletePhoto(mockReq, { send }, next);
    expect(next).not.toHaveBeenCalled();
    expect(updt).toHaveBeenCalledTimes(1);
    expect(dltPhoto).not.toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(
      expect.objectContaining({error: 'Error in catch'})
    );
    done();
  });


  /**
   * WorkPhotos
   */
  test('workPhotos() OK', async done => {

    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: ['fileupll'],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.resolve(usr));
    const send2 = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.workPhotos(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining(usr));
    done();
  }); 

  test('workPhotos() Error', async done => {

    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: ['fileupll'],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.resolve(null));
    const send2 = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.workPhotos(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({errors: 'error'}));
    done();
  }); 

  test('workPhotos() Error', async done => {

    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: ['fileupll'],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.reject({error: 'catch error'}));
    const send2 = jest.fn(args => {});
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.workPhotos(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({error: 'catch error'}));
    done();
  }); 
  
  test('workPhotos() Error no files', async done => {

    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: false,
      fileValidationError: true
    };

    await userCntr.workPhotos(mockReq, { send }, next);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({error: 'Controllwe upload error'}));
    done();
  }); 


  /**
  * uploadPhoto()
  */
  test('uploadPhoto() OK', async done => {
     
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: [{ path: 'fileupll'}],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.resolve(usr));
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.uploadPhoto(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining(usr));
    done();
  });


  test('uploadPhoto() Error Catch', async done => {
     
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: [{ path: 'fileupll'}],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.reject({error: 'catch'}));
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.uploadPhoto(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({error: 'catch'}));
    done();
  });

  test('uploadPhoto() Error', async done => {
     
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: [{ path: 'fileupll'}],
      fileValidationError: false
    };
    const updt = jest.fn(() => Promise.resolve(null));
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(updt);

    await userCntr.uploadPhoto(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({errors: 'error'}));
    done();
  });

  test('uploadPhoto() Error', async done => {
     
    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'] },
      body: {photo: '34534534534345'},
      files: [{ path: 'fileupll'}],
      fileValidationError: true
    };

    await userCntr.uploadPhoto(mockReq, { send }, next);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({error: 'Controllwe upload error'}));
    done();
  });


  /**
   * changePassword()
   */
  test('changePassword() Error incorect password', async done => {

    let mockReq = {
      user: { email: "eee@ff.com", work_photos: ['34534534534345', '34534534534346'], checkPassword: ()=>false },
      body: {newPassword: 'new', repeatPassword: 'new', currentPassword: 'cur'},
    };

    await userCntr.changePassword(mockReq, { send }, next);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({error: 'Incorrect password.'}));
    done();
  });

  test('changePassword() OK', async done => {
    user = new User({email: "eee@ff.com", name: 'kyky'});
    let mockReq = {
      user,
      body: {newPassword: 'new', repeatPassword: 'new', currentPassword: 'cur'},
    };
    const updt = jest.fn(() => Promise.resolve(user));
    jest.spyOn(User.prototype, "save").mockImplementationOnce(updt);
    jest.spyOn(User.prototype, "checkPassword").mockImplementationOnce((updt=> true));
    jest.spyOn(User.prototype, "generateHash").mockImplementationOnce((updt=> 'sdfsdf'));

    await userCntr.changePassword(mockReq, { send }, next);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({name: 'kyky'}));
    done();
  });

  test('changePassword() Error', async done => {
    user = new User({email: "eee@ff.com", name: 'kyky'});
    let mockReq = {
      user,
      body: {newPassword: 'new', repeatPassword: 'new', currentPassword: 'cur'},
    };
    const updt = jest.fn(() => Promise.resolve(null));
    jest.spyOn(User.prototype, "save").mockImplementationOnce(updt);
    jest.spyOn(User.prototype, "checkPassword").mockImplementationOnce((updt=> true));
    jest.spyOn(User.prototype, "generateHash").mockImplementationOnce((updt=> 'sdfsdf'));

    await userCntr.changePassword(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({errors: 'error'}));
    done();
  });

  test('changePassword() Error password not match', async done => {
    user = new User({email: "eee@ff.com", name: 'kyky'});
    let mockReq = {
      user,
      body: {newPassword: 'new', repeatPassword: 'new2', currentPassword: 'cur'},
    };
    jest.spyOn(User.prototype, "checkPassword").mockImplementationOnce((updt=> false));

    await userCntr.changePassword(mockReq, { send }, next);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({errors: 'Wrong passwords'}));
    done();
  });

  test.skip('changePassword() Error', async done => {
    user = new User({email: "eee@ff.com", name: 'kyky'});
    let mockReq = {
      user,
      body: {newPassword: 'new', repeatPassword: 'new', currentPassword: 'cur'},
    };
    const updt = jest.fn(() => Promise.reject({error: 'catch'}));
    jest.spyOn(User.prototype, "save").mockImplementationOnce(updt);
    jest.spyOn(User.prototype, "checkPassword").mockImplementationOnce((updt=> true));
    jest.spyOn(User.prototype, "generateHash").mockImplementationOnce((updt=> 'sdfsdf'));

    await userCntr.changePassword(mockReq, { send }, next);
    expect(updt).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenLastCalledWith(expect.objectContaining({errors: 'error'}));
    done();
  });

});
