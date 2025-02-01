import os
from flask import Flask, jsonify, request
from s3.list_files_in_s3 import list_files_in_s3
from s3.generate_presigned_url import generate_presigned_download_url
app = Flask(__name__)


@app.route('/list_s3_files', methods=['GET', 'OPTIONS'])
def list_s3_files():
    if request.method == 'OPTIONS':
        # Preflight request
        response = jsonify({"message": "CORS preflight"})
        response.headers.add("Access-Control-Allow-Origin", '*')
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET,OPTIONS")
        return response

    # Get the S3 bucket name and prefix (optional) from query parameters
    bucket_name = request.args.get('bucket_name')
    prefix = request.args.get('prefix', '')

    if not bucket_name:
        return jsonify({"error": "Missing required parameter 'bucket_name'"}), 400

    # List the files and folders in the specified S3 location
    result = list_files_in_s3(bucket_name, prefix)
    res = jsonify(result)
    res.headers.add("Access-Control-Allow-Origin", "*" )
    res.headers.add("Access-Control-Allow-Headers", "*")
    return res, 200

@app.route('/download_link', methods=['GET', 'OPTIONS'])
def create_download_link():
    if request.method == 'OPTIONS':
        # Preflight request
        response = jsonify({"message": "CORS preflight"})
        response.headers.add("Access-Control-Allow-Origin", '*')
        response.headers.add("Access-Control-Allow-Headers", "*")
        response.headers.add("Access-Control-Allow-Methods", "GET,OPTIONS")
        return response

    # Get the S3 bucket name and prefix (optional) from query parameters
    bucket_name = request.args.get('bucket_name')
    prefix = request.args.get('prefix', '')

    if not bucket_name:
        return jsonify({"error": "Missing required parameter 'bucket_name'"}), 400

    # List the files and folders in the specified S3 location
    result = generate_presigned_download_url(bucket_name, prefix)
    res = jsonify(result)
    res.headers.add("Access-Control-Allow-Origin", "*" )
    res.headers.add("Access-Control-Allow-Headers", "*")
    return res, 200

if __name__ == '__main__':
    app.run(debug=True)
