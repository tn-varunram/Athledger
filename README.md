# Athledger

This project is deployed in Docker as we coud not successfully deploy on Kubernetes. 

Steps to deploy in Docker - 
docker-compose up --build

Swagger URIs 
Authorization - http://localhost:8083/swagger-ui/index.html
SlotMgmt - http://localhost:8081/swagger-ui/index.html
SlotBooking - http://localhpst:8082/swagger-ui/index.html

Issues with Kubernetes Deployment - 
We do have a folder k8s/ which has all the yaml files to deploy the backend services. We could deploy them using these k8s yaml files but when we make a rebuild with latest changes in the codebase we consistently ran into CORS issue with the loadBalancer. We did not know how to resolve this issue. 


#ForDev
Steps to deployed in Kubernetes to recheck the issue

1. kubectl create configmap mysql-init-script --from-file=init.sql=./init.sql
2. kubectl apply pvc mysql-pvc.yaml
3. kubectl apply -f mysql-deployment.yaml
4. kubectl apply -f mysql-service.yaml
5. kubectl apply -f kafka.yaml
6. kubectl apply -f authorization-deployment.yaml
7. kubectl apply -f authorization-service.yaml
8. kubectl apply -f slotmgmt-deployment.yaml
9. kubectl apply -f slotmgmt-service.yaml
10. kubectl apply -f slotbooking-deployment.yaml
11. kubectl apply -f slotbooking-service.yaml
12. kubectl apply -f frontend-service.yaml


Some more commands
docker build -t authorization ./backend/authorization

docker tag authorization varunram3/authorization:latest

docker push varunram3/authorization:latest


docker login

docker push varunram3/authorization:latest

kubectl create configmap mysql-init-script --from-file=init.sql=./init.sql




