module.exports = {
	name: 'help',
	description: 'What, can you read?',
	execute(message, args, fs) {
        message.reply(` hello, welcome to the High Life Lounge!
Here is what you can do here:
        
Order a drink!
\`!order <drink type> <drink name> <mixer (if drink is liquor)>\`

For an example: \`!order beer high-life\` to order the champane of beers

Pay your tab!
\`!tab <show/pay>\`

For an example: \`!tab show\` to see your current tab
            or: \`!tab pay\` to close your tab, then do the same command again once you have paid
        `)
	},
};
