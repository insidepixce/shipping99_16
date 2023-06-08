
#백엔드 서버 코드를 이곳에 작성합니다 
#원활한 aws 배포를 위해 포트는 8001으로 통일합니다 (4000, 3000은 피해주세요)
#커밋 메세지에 무엇을 수정했는지 자세하게 적어주세요(한글로 길게 쓸 수 있어요)
# 커밋 메세지 통일 : (수정자)/(날짜)/(수정한 파일명)/(수정한 부분)/(수정한 이유)/
# ex) 박교담/2023.06.06/app.py/getrequests 함수/코드 수정/코드를 간결하게 수정
# 스테이징 시 주의사항 : git add . 하지 말아주세요
# 스테이징 시 수정할 파일만 뽑아서 스테이징해주세요
# 커밋 메세지 통일 꼭 지켜주세요
# <<<<<<< HEAD

# 안녕하십니까~~
# =======
# 하이!!




from flask import Flask, render_template, jsonify, request
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import pymongo
from bson.binary import Binary

app= Flask(__name__)
CORS(app)


@app.route("/save_movie", methods=["POST"])
def save_straGram():
    movie_title = request.form.get("movieTitleInput")
    movie_description = request.form.get("movieDescriptionTextarea")
    my_comment = request.form.get("myCommentTextarea")
    rating = (request.form.get("ratingSelect"))
    image_file = request.files.get("imageUploadInput")

def back():
    # 이미지 파일의 이름을 MongoDB에 저장합니다.
    image_filename = image_file.filename

    # 이미지를 열고 바이너리로 변환합니다.
    image = Image.open(image_file)
    image_binary = io.BytesIO()
    image.save(image_binary, format='JPEG')
    image_binary = image_binary.getvalue()

    # 데이터를 데이터베이스에 삽입합니다.
    straGram_data = {
        "": movie_title,
        "": movie_description,
        "": my_comment,
        "": rating,
        "image": Binary(image_binary),  # 이미지 바이너리 데이터 저장
    }
    collection.insert_man(straGram_data)

    return str(straGram_data)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/feeds',methods=['GET'])
def get_feed_data() :
    data = [
        {
            "id" : 0,
            "title" : '먹스타그램',
            "image_url" : "https://pelicana.co.kr/resources/images/menu/best_menu02_200824.jpg",
            "content" : "맛있으면 0칼로리"
        },
        {
            "id" : 1,
            "title" : '먹스타그램2',
            "image_url" : "https://cdn.paris.spl.li/wp-content/uploads/535370-%ED%8C%8C%EC%86%A1%EC%86%A1%EC%A0%95%ED%86%B5%EC%A7%9C%EC%9E%A5%EB%A9%B4_%EC%8D%B8%EB%84%A4%EC%9D%BC2.png",
            "content" : "다이어트는 내일부터"
        },
        
    ]
    return jsonify(data)

@app.route('/api/images', methods=['POST'])
def upload_image():
    if 'files[]' in request.files:
        file = request.files['files[]']
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join('./images', filename)

            # MongoDB connection 해주시면 됩니다.
            client = pymongo.MongoClient('mongoDB 주소')
            db = client['DB이름']
            collection = db['Collection이름']

            # 파일 이진 변환
            with open(file_path, 'rb') as f:
                binary_data = Binary(f.read())

            # 몽고디비에 저장
            collection.insert_one({'image': binary_data, 'filename': filename})
            return 'File successfully saved'
    else:
        return 'No file part in the request', 400

if __name__ == '__main__':
    app.run('0.0.0.0', port=8001, debug=True)
