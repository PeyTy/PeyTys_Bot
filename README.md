# PeyTy's Bot

This bot is a part of but not limited to the [Hexa](https://github.com/hexalang) and [GreenteaOS](https://github.com/GreenteaOS) projects.

Telegram https://t.me/peytys_bot

Manual build requires [Hexa](https://github.com/hexalang), NPM and Node.

Supported features:

+ Generates stickers in *inline* mode
+ Makes computations in *inline* mode
+ Generates stickers by reply to message with "Sticker" word
+ Generates stickers by writing message "Sticker sticker text"
+ Says hello to newcomers
+ Removes bots instantly for group if admin

Create `config.json` within `bot.js` directory:

```json
{
	"token": "000000000:AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaAaaaa",
	"wikiPath": "/Greentea/Greentea/",
	"wikiPathKernel": "/Greentea/Kernel.wiki/",
	"whitelist": ["whitelisted"],
	"profane": ["blacklisted"]
}
```

Create `requested.json` within `bot.js` directory with just this:

```json
[]
```

Build:

```sh
npm install -g nodemon
npm i
hexa hexa.json
nodemon
```

## License

[Licensed under GNU GENERAL PUBLIC LICENSE Version 3](https://github.com/PeyTy/PeyTys_Bot/blob/master/LICENSE)
