// 필요한 모듈 및 패키지 가져오기
const express = require('express');
const mongoose = require('mongoose');

// Express 애플리케이션 생성
const app = express();

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((error) => {
    console.error('MongoDB 연결 오류:', error);
  });

// 사용자 데이터 모델 정의
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String
});

const User = mongoose.model('User', userSchema);

// 회원가입 API 엔드포인트
app.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // 이미 존재하는 사용자인지 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
    }

    // 새 사용자 생성
    const newUser = new User({ username, password, email });
    await newUser.save();

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류로 회원가입을 완료할 수 없습니다.' });
  }
});

// 로그인 API 엔드포인트
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 인증
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: '인증에 실패했습니다.' });
    }

    res.status(200).json({ message: '로그인이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류로 로그인을 완료할 수 없습니다.' });
  }
});

// 서버 시작
app.listen(8001, () => {
  console.log('서버가 포트 8000에서 실행 중입니다.');
});
