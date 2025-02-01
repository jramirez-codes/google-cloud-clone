import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import time
# Set up AWS S3 client using boto3
s3_client = boto3.client('s3')

def get_file_content_type(bucket_name, key):
  sleep_time = 1
  while True:
      try:
          response = s3_client.head_object(Bucket=bucket_name, Key=key)
          return response.get('ContentType', 'unknown')
      except Exception as e:
          time.sleep(sleep_time)

def list_files_in_s3(bucket_name, prefix=''):
    try:
        # List objects in the given bucket with the specified prefix (if any)
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=prefix, Delimiter='/')

        # Parse the response to list folders and files
        files = []

        if 'CommonPrefixes' in response:
            files += [{
                "name": prefix['Prefix'][:-1].split('/')[-1],
                "size": "-",
                "modified": "-",
                "type": "folder",
            } for prefix in response['CommonPrefixes']]
        if 'Contents' in response:
            for content in response['Contents']:
                file_info = {
                    "name": content['Key'].split('/')[-1],
                    "size": content['Size'],
                    "modified": content['LastModified'].isoformat(),
                    "type": get_file_content_type(bucket_name, content['Key']),
                }
                if content['Size'] != 0:
                    files.append(file_info)

        return files

    except NoCredentialsError:
        return {"error": "AWS credentials not found."}
    except PartialCredentialsError:
        return {"error": "Incomplete AWS credentials."}
    except Exception as e:
        return {"error": str(e)}
