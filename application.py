""" 
#프론트앤드 서버 코드를 이곳에 작성합니다 
#원활한 aws 배포를 위해 포트는 8001으로 통일합니다 (4000, 3000은 피해주세요)
#커밋 메세지에 무엇을 수정했는지 자세하게 적어주세요(한글로 길게 쓸 수 있어요)
커밋 메세지 통일 : (수정자)/(날짜)/(수정한 파일명)/(수정한 부분)/(수정한 이유)/
ex) 박교담/2023.06.06/application.py/getrequests 함수/코드 수정/코드를 간결하게 수정
스테이징 시 주의사항 : git add . 하지 말아주세요
스테이징 시 수정할 파일만 뽑아서 스테이징해주세요
커밋 메세지 통일 꼭 지켜주세요

안녕하십니까~~
 """

from flask import Flask, render_template

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    application.run('0.0.0.0', port=8001, debug=True)
