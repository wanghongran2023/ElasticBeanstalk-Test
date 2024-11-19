# ElasticBeanstalk Test

# Introduction
  This project use github action workflow to deploy elastic beanstalk application
  
# Step to deploy the app
 - 1: Create ElasticBeanstalk in aws
 - 2: Create a iam user with ElasticBeanstalk, S3 and ALB permission
 - 3: set up the credentials in github repo secret
 - 4:  run the workflow

# Step to test the app
  - 1: run {{URL}}/getToken?key=helloworl to get the token
  - 2: run {{URL}}/filteredimage?image_url=****&token=********************************* to get the result
