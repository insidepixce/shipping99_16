
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




from flask import Flask, render_template, jsonify, request,send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import pymongo
from bson.binary import Binary
import base64

app= Flask(__name__,static_folder='client/build')
CORS(app)

@app.route('/',defaults={'path':''})
@app.route('/<path:path>')

def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/feeds',methods=['GET'])
def get_feed_data() :
        client = pymongo.MongoClient('mongodb+srv://Haru:yalhue01@cluster0.sx50ttz.mongodb.net/?retryWrites=true&w=majority')
        db = client['hangsta']
        collection = db['feeds']

        return jsonify(list(collection.find({},{'_id' : 0})))


@app.route('/api/images', methods=['POST'])
def upload_image():

    if 'image_url' in request.files:
        file = request.files['image_url']

        if file:
            filename = secure_filename(file.filename)

            client = pymongo.MongoClient('mongodb+srv://Haru:yalhue01@cluster0.sx50ttz.mongodb.net/?retryWrites=true&w=majority')
            db = client['hangsta']
            collection = db['feeds']

            img_data = file.read()
            img_base64 = base64.b64encode(img_data).decode('utf-8')

            collection.insert_one({
                'title': request.form['title'], 
                'content': request.form['content'], 
                'image': img_base64, 
                'filename': filename
            })
            return 'File successfully saved'
    else:
        return 'No file part in the request', 400

if __name__ == '__main__':
    app.run('0.0.0.0', port=8001, debug=True)

# debug=True 배포시 꼭빼주세요
