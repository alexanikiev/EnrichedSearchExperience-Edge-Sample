# To enable ssh & remote debugging on app service change the base image to the one below
# FROM mcr.microsoft.com/azure-functions/node:2.0-appservice
FROM mcr.microsoft.com/azure-functions/node:2.0

#ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
#    AzureFunctionsJobHost__Logging__Console__IsEnabled=true \ 
#    CORS_ALLOWED_ORIGINS="*" \
#    CORS_SUPPORT_CREDENTIALS=true \
#    AzureWebJobsStorage="DefaultEndpointsProtocol=https;AccountName=esestorageedge;AccountKey=alZuQ2m0IQq29NNtzG2ba7azPuHVvCbDXZgB2FG7xUeYkVzrg0ZozOuWIwCeZc1o8eMRx6ozDlPnniGUO4b4jA==;EndpointSuffix=core.windows.net"

COPY . /home/site/wwwroot

RUN cd /home/site/wwwroot && \
    npm install