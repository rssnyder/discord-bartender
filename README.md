# discord-bartender
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FMr-Schneider%2Fdiscord-bartender%2Fbadge&style=flat)](https://actions-badge.atrox.dev/Mr-Schneider/discord-bartender/goto)

discord bot to serve drinks and terrible jokes

## Commands

### Order
```
!order
```
Order a drink! Item will be added to your tab if the purchase is successful.

#### Beer
```
!order beer <type/brand>
```

#### Wine
```
!order wine <type/brand>
```

#### Liquor
```
!order liquor <type/brand> <mixer (optional)>
```

### Tab
```
!tab
```
Check your tab, and pay it if you feel like!

#### Show
```
!tab show
```
Take a look at what you have ordered so far.

#### Pay
```
!tab pay
```
This will close out your tab, and present you with a dogecoin address to send payment to. Once you close your tab, you cannot order any more drinks until your tab is paid.

### Help
```
!help
```

## Deployment

This is currently written to deploy to Google Cloud using Google App Engine. It could esily be modified to run another way.

### GCP

To deploy, sign into the gcloud cli.

Sign in with a user account `gcloud auth login` or if you have a service account file, `gcloud auth activate-service-account --key-file [KEY_FILE]`

Once authenticated, `gcloud app deploy --promote --stop-previous-version --version=<version name> --quiet`

This will deploy with only one version tag, and due to the app.yml there will only be one instance, so every time you deploy your newest version will be the only version running. If you get too many different versions, you can use the `clean` script to clean them up `clean <service (usually "default")> <# of versions to keep>`

### Self Hosted

Run run locally, simply fill in `config.json`:
```
{
	"prefix": "!",
	"token": "[DISCORD_BOT_TOKEN]"
}
```

Then change (in `server.js`):
```
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
```

To:
```
let serviceAccount = require('[KEY_FILE]');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
```

Then you can start the server
```
node server.js
```