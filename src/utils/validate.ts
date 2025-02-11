
type UserInformation = {
    email: string;
    password: string;
}

function validateUser(values: UserInformation) {
    const errors = {
      email: '',
      password: '',
    };
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }
    if (!(values.password.length >= 8 && values.password.length <= 20)) {
      errors.password = '비밀번호는 8 ~ 20자 사이로 입력해주세요';
    }
    if(!/^[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?~-]+$/.test(values.password)) {
      errors.password = '비밀번호는 영문자, 숫자, 특수문자(!@#$%^&*()_+{}|:"<>?~- 등)로 구성되어야 합니다.';
    }
    return errors;
  }

  export default validateUser;