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