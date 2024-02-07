# CloudCollective:

### A Cloud Based social network.

CloudCollective is a social networking platform built on Microsoft Azure's cloud infrastructure. Designed to connect people globally while leveraging the power of cloud computing, CloudCollective offers users a secure environment to interact with your friends, follow them, publishing posts and interacting with other people's posts.
It also features an Explore section that allows you to discover new content compatible with your interests.

## Contributions

Contributions are very much appreciated. Please well describe your changes inside your PR to make it easier to understand them.

If you encounter any problem or bug that is unrelated with your own machine, please report it and *open a new issue* with replicable steps. 

## Setup you Azure enviroment

Setting up your Azure environment correctly is critical to the proper functioning of this project.
To follow the following instructions you need to have an active Azure Account and Azure-cli.

First of all **login to azure-cli**.
 ```bash 
az login
```

Then you have to create a **resource group** that will contain all the resouurces
 ```bash 
az group create --name <resource-group-name> --location <location>
```

After the resource group we will need the **MySQL database**
 ```bash 
az mysql flexible-server create --location <location> --resource-group <resource-group-name> --name <db-name> --admin-user <db-username> --admin-password <db-password --auto-scale-iops Enabled
```

We will need a **Storage Account** too, that will contain out *Images* container
 ```bash 
az storage account create --name <storage-name> --resource-group <resource-group-name> --location <location> --sku Standard_ZRS --encryption-services blob
az storage container create  --account-name <storage-name>  --name images
```

The last step before the deployment is the creation of a **Computer Vision** *Cognitive Service Acount*
 ```bash
az cognitiveservices account create --kind ComputerVision --location <location> --name <computer-vision-name> --resource-group <resource-group-name>  --sku F0
```
Now we have everything ready for the deployment, so let's create the **App service**
 ```bash
az appservice plan create --name <app-service-plan-name> --resource-group  <resource-group-name> --is-linux —-location <location> --sku B1
az webapp create --name <app-name> --plan <app-service-plan-name> --resource-group <resource-group-name> --runtime "NODE:20-lts"
```

And at last deploy the webapp with **GitHub Actions**
 ```bash
az webapp deployment github-actions add --repo LukaszG92/CloudCollective --branch main --resource-group <resource-group-name> --name <app-name> --runtime "NODE:20-lts" --login-with-github
```

## References
This repository borrows partially from [instagram-clone-frontend](https://github.com/yassinjouao/instagram-clone-frontend) and [instagram-clone-backend](https://github.com/yassinjouao/instagram-clone-backend) repositories.
