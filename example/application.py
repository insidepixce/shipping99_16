from flask import Flask, render_template, request, Response
from pymongo import MongoClient
from bson import ObjectId
from bson.json_util import dumps
from PIL import Image
import io
from bson import Binary

application = app = Flask(__name__)

# MongoDB에 연결합니다.
client = MongoClient('mongodb+srv://sparta:test@sparta.rqx1qlk.mongodb.net/?retryWrites=true&w=majority')

db = client.mydays
collection = db.junes

# index.html 템플릿을 렌더링합니다.
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/get_movies", methods=["GET"])



def get_movies():
    movies = collection.find()
    return dumps(movies)  # Convert BSON to JSON

@app.route("/save_movie", methods=["POST"])
def save_movie():
    movie_title = request.form.get("movieTitleInput")
    movie_description = request.form.get("movieDescriptionTextarea")
    my_comment = request.form.get("myCommentTextarea")
    rating = (request.form.get("ratingSelect"))
    image_file = request.files.get("imageUploadInput")

    # 이미지 파일의 이름을 MongoDB에 저장합니다.
    image_filename = image_file.filename

    # 이미지를 열고 바이너리로 변환합니다.
    image = Image.open(image_file)
    image_binary = io.BytesIO()
    image.save(image_binary, format='JPEG')
    image_binary = image_binary.getvalue()

    # 영화 데이터를 데이터베이스에 삽입합니다.
    movie_data = {
        "movie_title": movie_title,
        "movie_description": movie_description,
        "my_comment": my_comment,
        "rating": rating,
        "image": Binary(image_binary),  # 이미지 바이너리 데이터 저장
    }
    collection.insert_one(movie_data)

    return str(movie_data)

@app.route('/image/<movie_id>')
def get_image(movie_id):
    movie = collection.find_one({'_id': ObjectId(movie_id)})
    return Response(movie['image'], mimetype='image/jpeg')



if __name__ == '__main__':
   app.run('0.0.0.0', port=8001, debug=True)
