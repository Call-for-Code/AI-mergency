# AI-mergency Control Room Deployment

Before you start the deployment, make sure the app runs locally. Run ```$ npm-install``` if any dependencies are missing. To deploy to bluemix:
1. Change into the node_app directory
2. Connect to bluemix:
```
$ ibmcloud api https://api.ng.bluemix.net
$ imbcloud login --apikey <theApiKey>
$ ibmcloud target --cf -o <organization> -s <space>
```
3. Push your changes: ```ibmcloud cf push```

If there are problems, look at the app's Log in bluemix.
