var assert = require('assert');
describe('Test Simple', () => {
  it('1 is 1', function () {
    assert.equal(1, 1);
  });

  it('1 + 3 is not 5', function () {
    assert.notEqual(1 + 3, 5);
  });
})

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  Login(userId, userPassword) {
    const user = this.userRepository.findByIdAndPassword(userId, userPassword);
    return user == undefined ? false : true;
  }
}

class UserRepository {
  findByIdAndPassword(id, password){
    if (id == "test"){
      return new User();
    }
    return undefined;
  }
}

class User {

}

describe('User TestCast', () => {
  describe('User Login', () => {
    it('Login Sucsess', function () {
      // Given
      const userId = "test";
      const userPassword = "test_password";
      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);

      // When
      const result = userService.Login(userId, userPassword);

      // Then
      assert.ok(result);
    });
    it('Login Fail', function () {
      // Given
      const userId = "i'm not user";
      const userPassword = "test_password";
      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);

      // When
      const result = userService.Login(userId, userPassword);

      // Then
      assert.ok(!result);
    });
  })
});