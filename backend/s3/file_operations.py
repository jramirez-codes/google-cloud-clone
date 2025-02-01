import boto3

s3 = boto3.client('s3')

def move_s3_file(bucket_name, source_key, destination_key):
    """
    Move a file within an S3 bucket by copying it to the new location and deleting the original.
    
    :param bucket_name: Name of the S3 bucket
    :param source_key: Source file key (path in the bucket)
    :param destination_key: Destination file key (new path in the bucket)
    """
    
    # Copy the file to the new location
    s3.copy_object(Bucket=bucket_name, CopySource={'Bucket': bucket_name, 'Key': source_key}, Key=destination_key)
    
    # Delete the original file
    s3.delete_object(Bucket=bucket_name, Key=source_key)
    

def delete_s3_file(bucket_name, source_key):
    try:
        s3.delete_object(Bucket=bucket_name, Key=source_key)
        return True
    except Exception as e:
        print(e)
        return False