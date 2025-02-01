import boto3
from botocore.exceptions import NoCredentialsError

s3_client = boto3.client('s3')

def generate_presigned_download_url(bucket_name, object_key, expiration=3600):
    try:
        # Generate the presigned URL to download the object
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': bucket_name, 'Key': object_key},
            ExpiresIn=expiration  # Expiration time in seconds (default is 1 hour)
        )
        return {"download_url": url}
    except NoCredentialsError:
        print("Credentials not available.")
        return None

def generate_presigned_upload_url(bucket_name, object_name, content_type, expiration=3600):
    try:
        response = s3_client.generate_presigned_url(
            "put_object",
            Params={"Bucket": bucket_name, "Key": object_name, "ContentType": content_type},
            ExpiresIn=expiration,
        )
        return response
    except Exception as e:
        print(f"Error generating presigned URL: {e}")
        return None