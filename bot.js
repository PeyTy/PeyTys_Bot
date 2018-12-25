{
	"use strict"
	const $global$ = typeof(window) === "undefined"?global:window
	var ChatType = {}
	var EntityType = {}
	var ParseMode = {}
	var Buffer = $global$.Buffer
	var ProcessStd = $global$.ProcessStd
	var Process = $global$.process
	var ParsedPath = $global$.ParsedPath
	var Path = require("path")
	var Fs = require("fs")
	var RangeError = $global$.RangeError
	var ReferenceError = $global$.ReferenceError
	var SyntaxError = $global$.SyntaxError
	var TypeError = $global$.TypeError
	var URIError = $global$.URIError
	var EvalError = $global$.EvalError
	var Error = $global$.Error
	var RegExpMatch = $global$.RegExpMatch
	var RegExp = $global$.RegExp
	var Date = $global$.Date
	var Array = $global$.Array
	var Console = $global$.console
	var Map = $global$.Map
	var JSON = $global$.JSON
	var Math = $global$.Math
	var String = $global$.String
	var Float = $global$.Float
	var Bool = $global$.Bool
	var Int = $global$.Int
	var Any = $global$.Any
	var Void = $global$.Void
	var Id = $global$.Id
	var Function = $global$.Function
	var Global = $global$.global
	var TelegramBot = require("./tdlib-telegram-bot-api")
	var Curl = require("curlrequest")
	var GitHubHandler = $global$.GitHubHandler
	var Buffer = $global$.Buffer
	var RegExp = $global$.RegExp
	var JSON = $global$.JSON
	var Console = $global$.console
	var Bot = class {
		constructor() { 
		{
			const http = require('http');
			const url = require('url');
			const fs = require('fs');
			const webshot = require('webshot');
			const math_116 = require('mathjs');
			const createHandler = require('github-webhook-handler');
			const path = require('path');
			const webp = require('webp-converter');
			const config_117 = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
			const requested = JSON.parse(fs.readFileSync(__dirname + '/requested.json'));
			const saveChatSettings = () => { fs.writeFileSync(__dirname + '/requested.json', JSON.stringify(requested)) };
			const getChatSettings = (id_118) => {
				for (const chat of requested) {
					if (chat.id == id_118) { return chat };
				};
				const chat_119 = {id:id_118};
				requested.push(chat_119);
				saveChatSettings();
				return chat_119;
			};
			const token_120 = config_117.token;
			const wikiPath = config_117.wikiPath;
			const wikiPathKernel = config_117.wikiPathKernel;
			const dir = 'temp';
			if (!fs.existsSync(dir)) { fs.mkdirSync(dir) };
			const data_121 = 'data';
			if (!fs.existsSync(data_121)) { fs.mkdirSync(data_121) };
			const bot = new TelegramBot(token_120, {polling:true});
			let lastRandomIndex = -1;
			const genRandomIndex = (arr) => { return Math.floor(Math.random() * arr.length) };
			const randomFromArray = (arr_122) => {
				let ind = genRandomIndex(arr_122);
				if (lastRandomIndex == ind) { ind = genRandomIndex(arr_122) };
				lastRandomIndex = ind;
				return arr_122[ind];
			};
			const calcMemory = new Map();
			const tryCalculator = (commandPartsTrimmed) => {
				const result_123 = [];
				for (const part of commandPartsTrimmed) {
					const splitted = part.split('=');
					if ((splitted.length != 3) && (splitted.length != 2)) { continue };
					const varname = splitted[0].trim();
					const value = (((splitted[2]) || (''))).trim();
					if ((varname != '') && (value == '')) {
						result_123.push(varname + ' = ' + (((calcMemory.get(varname)) || ('not set'))));
						continue;
					};
				};
				if (result_123.length > 0) { return result_123.join('\r\n') };
				return null;
			};
			const drawSticker = (chatId, text_124, promiseHandler) => {
				const tmp = 'temp\\' + Math.random() + '_' + Math.random() + '.png';
				webshot(text_124, tmp, {siteType:'html', screenSize:{width:128, height:20}, shotSize:{width:'all', height:'all'}}, (err) => { webp.cwebp(tmp, tmp + '.webp', '-q 80', (status) => { promiseHandler(bot.sendSticker(chatId, tmp + '.webp')) }) });
			};
			bot.on('inline_query', (query_125) => { try {
				{
					{
						return;
					};
					Console.log(query_125);
					const queryId = query_125.id;
					let offset = ((Global.parseInt(query_125.offset)) || (0));
					let text_126 = query_125.query.substr(offset).trim();
					Console.log('query:<' + text_126 + '>' + text_126.charCodeAt(0));
					if (text_126.length < 1 || text_126 == '') { return };
					if (text_126.split(' ').length < 4) { text_126 = '&nbsp; ' + text_126 + ' &nbsp;' };
					text_126 = text_126.split('<').join('&lt;').split('>').join('&gt;');
					text_126 = text_126.substr(0, Math.round(Math.min(1000, text_126.length)));
					text_126 = '<!DOCTYPE html><html><body><style>*{font-family: "verdana";-webkit-text-stroke: 5px white;font-size: 50px;}</style><center><b>' + text_126.split(' ').join('</br>') + '</b></center></body></html>';
					const results = [];
					const mathValue = Bot.calculate(query_125.query.substr(offset).trim());
					drawSticker(Bot.admin_chat, text_126, (promise) => { promise.then((resp) => {
						const sticker = resp.sticker.file_id;
						results.push({type:'sticker', id:sticker, sticker_file_id:sticker});
						{
							let step = 0;
							const math_127 = mathValue;
							if (step == 0 && math_127 != null) { step = 1 };
							if (step == 1) { results.push({type:'article', id:sticker + '-math', title:query_125.query.substr(offset).trim(), description:math_127, input_message_content:{message_text:'' + query_125.query.substr(offset).trim() + ' = ' + math_127}}) };
						};
						results.push({type:'article', id:sticker + '-article', title:'Click on the sticker on the top left!', description:'Even if you don\'t see it, it\'s there!', input_message_content:{message_text:'' + query_125.query.substr(offset).trim()}});
						Global.setTimeout(() => { bot.answerInlineQuery(queryId, results, {cache_time:86400}) }, 222);
					}) });
				}
			} catch (e) {
				console.error(e)
			} });
			let previousMessage = null;
			let grammarReason = null;
			bot.on('message', (msg) => {
				Console.log(msg);
				try {
					{
						const chatId_128 = msg.chat.id;
						const en = Bot.english.indexOf(msg.chat.id) != -1;
						{
							let step_129 = 0;
							const new_chat_participant = msg.new_chat_participant;
							let username = null;
							if (step_129 == 0 && new_chat_participant != null) {
								username = ((new_chat_participant.username) || (new_chat_participant.first_name));
								step_129 = 1;
							};
							if (step_129 == 1 && username != null) { step_129 = 2 };
							if (step_129 == 2) {
								if (username == 'peytys_bot') {
									bot.sendMessage(chatId_128, 'Hello there!');
									return;
								};
								if (username.toLowerCase().endsWith('bot')) {
									bot.sendMessage(chatId_128, 'Bot! BOT! --> @' + username + ' <-- caught it!').then(() => (bot.sendSticker(chatId_128, Bot.stickerAttention))).then(() => (bot.sendMessage(chatId_128, 'Bot bot bot! Bots right HERE!'))).then(() => (bot.kickChatMember(chatId_128, new_chat_participant.id))).then(() => (bot.sendMessage(chatId_128, 'Fight Skynet!')));
									return;
								};
								Global.setTimeout(() => {
									if (!en) { bot.sendMessage(chatId_128, randomFromArray(['Hola', 'Welcome', 'Aloha']) + ', @' + username + '!') };
									if (en) { bot.sendMessage(chatId_128, 'Welcome, @' + username + '! Don\'t make a lot of grammatical errors. I\'m watching you.\n' + 'Behave yourself culturally and all that!\n' + 'For trying to trolling, you risk a ban.\n' + 'For useful information, look at the description of the group.\n' + 'Group is 18+, for topics of discussion and vocabulary, moral damage and mental turmoil, no responsibility.\n\n' + 'I said everything, %username%!\n' + 'I mean, @' + msg.new_chat_participant.username) };
								}, 500);
								return;
							};
						};
						if (en) { return };
						{
							let step_130 = 0;
							const msgText = msg.text;
							if (step_130 == 0 && msgText != null) { step_130 = 1 };
							if (step_130 == 1) { if ((msgText.toLowerCase() == '/start' && msg.chat.type == 'private') || msgText.toLowerCase() == '/start@peytys_bot') {
								bot.sendMessage(chatId_128, 'Hello! ' + Bot.help, {reply_to_message_id:msg.message_id});
								return;
							} else if (msgText.charAt(0) == '/') { return } } else {
								msg.text = '';
							};
						};
						if (msg.text == null || msg.text == undefined) { Console.log(JSON.stringify(msg, null, 2)) };
						const commandParts = msg.text.toLowerCase().split('\r').join('').split('\n');
						const commandPartsTrimmed_131 = [];
						for (const part of commandParts) {
							commandPartsTrimmed_131.push(part.trim());
						};
						const command = commandPartsTrimmed_131.join('\n');
						msg.from = ((msg.from) || ({username:''}));
						msg.from.username = ((msg.from.username) || (''));
						const isAdmin = msg.from.id == Bot.admin_id;
						if (msg.from.id == 308116295) { return };
						if (getChatSettings(msg.chat.id).allowProfanes != true) {
							const joined = (((msg.text) || (''))).toLowerCase().split('  ').join(' ').split('.').join(' ').split(',').join(' ').split(';').join(' ').split('!').join(' ').split('?').join(' ').split(':').join(' ').split('(').join(' ').split(')').join(' ').split('"').join(' ').split('\t').join(' ').split('\n').join(' ').split(' ');
							const profanes = config_117.profane;
							let hasProfane = -1;
							{
								const value_132 = joined.length;
								let i = 0;
								while (i < value_132) {
									{
										const word = joined[i];
										for (const profane of profanes) {
											if (word == profane) {
												hasProfane = i;
												break;
											};
											if (word.startsWith(profane)) {
												hasProfane = i;
												break;
											};
											if (word.endsWith(profane)) {
												hasProfane = i;
												break;
											};
											if (hasProfane != -1) { break };
										};
										if (hasProfane != -1) { break };
									};
									i++;
								};
							};
							if ((Math.random() > 0.4) && (joined != '') && (hasProfane != -1) && (config_117.whitelist.indexOf(joined[hasProfane]) == -1)) {
								const warn = randomFromArray(['Don\'t use profane words!', 'Algorithm detected offensive language. You should generally avoid it.', 'It\'s always better to be polite', 'Avoid bad language!']) + '\n\nTrigger: ' + joined[hasProfane];
								bot.sendMessage(chatId_128, warn, {reply_to_message_id:msg.message_id});
								return;
							};
						};
						if ((isAdmin) && (msg.text != '') && (msg.entities && msg.entities[0]) && ((msg.entities[0].offset == 0) && (msg.entities[0].type == 'pre' || msg.entities[0].type == 'code')) && (msg.entities[0].length == (msg.text.length - 0)) && (msg.text.indexOf('return') != -1) && (msg.text.indexOf('while') == -1) && (msg.text.indexOf('for') == -1) && (msg.text.indexOf('function') == -1) && (msg.text.indexOf('=>') == -1)) {
							try {
								{
									bot.sendMessage(chatId_128, '' + Bot.evaluator(msg.text), {reply_to_message_id:msg.message_id});
								}
							} catch (e) {
								{
									bot.sendMessage(chatId_128, '' + e.message, {reply_to_message_id:msg.message_id});
								}
							};
							return;
						};
						if (isAdmin) {
							if (command == 'allow profanes') {
								getChatSettings(msg.chat.id).allowProfanes = true;
								saveChatSettings();
								bot.sendMessage(chatId_128, 'Profanes allowed, gosh! :(', {reply_to_message_id:msg.message_id});
								return;
							};
							if (command == 'disallow profanes') {
								getChatSettings(msg.chat.id).allowProfanes = false;
								saveChatSettings();
								bot.sendMessage(chatId_128, 'Profanes disallowed, very nice!', {reply_to_message_id:msg.message_id});
								return;
							};
						};
						if (isAdmin) {
							if (command.indexOf('message info') > -1) { bot.sendMessage(chatId_128, '```\n' + JSON.stringify(msg, null, 2) + '\n```', {reply_to_message_id:msg.message_id}) };
							if (command.indexOf('test sticker') > -1) { bot.sendSticker(chatId_128, 'CAADAwADhQEAAu_thAXDSDqVrNRJjQI', {reply_to_message_id:msg.message_id}) };
							if (command.indexOf('previous message info') > -1) {
								if (previousMessage == null) {
									bot.sendMessage(chatId_128, 'I misremember :С', {reply_to_message_id:msg.message_id});
									return;
								};
								bot.sendMessage(chatId_128, JSON.stringify(previousMessage, null, 2), {reply_to_message_id:msg.message_id});
								return;
							};
							if (command == 'screenshot') {
								const links = [];
								let entities = msg.reply_to_message.entities;
								if (entities != null) { for (const e of entities) {
									if (e.type == 'url') { links.push(msg.reply_to_message.text.substr(e.offset, e.length)) } else if (e.type == 'text_link') { links.push(e.url) };
								} };
								entities = msg.entities;
								if (entities != null) { for (const e of entities) {
									if (e.type == 'url') { links.push(msg.text.substr(e.offset, e.length)) } else if (e.type == 'text_link') { links.push(e.url) };
								} };
								if (links.length == 0) { return bot.sendMessage(chatId_128, 'Nothing to shot 😢', {reply_to_message_id:msg.message_id}) };
								const shotAllLinks = (links_133, index = 0) => {
									const link = links_133[index];
									bot.sendMessage(chatId_128, 'Shooting ' + link, {reply_to_message_id:msg.message_id});
									const tmp_134 = 'temp\\' + Math.random() + '_' + Math.random() + '.pdf';
									{
										return;
									};
									webshot(link, tmp_134, {defaultWhiteBackground:true, quality:55, shotSize:{width:'all', height:'all'}}, (err_135) => {
										{
											let step_136 = 0;
											const err_137 = err_135;
											if (step_136 == 0 && err_137 != null) { step_136 = 1 };
											if (step_136 == 1) { bot.sendMessage(chatId_128, 'Error 👻 ' + err_137, {reply_to_message_id:msg.message_id}) } else {
												bot.sendDocument(chatId_128, tmp_134, {reply_to_message_id:msg.message_id});
												fs.unlink(tmp_134, () => ((() => { return Console.log(tmp_134 + ' deleted,') })()));
											};
										};
										if ((++index) < links_133.length) { shotAllLinks(links_133, index) };
									});
								};
								shotAllLinks(links);
								return;
							};
						};
						previousMessage = msg;
						const mathValue_138 = Bot.calculate(msg.text);
						{
							let step_139 = 0;
							const math_140 = mathValue_138;
							if (step_139 == 0 && math_140 != null) { step_139 = 1 };
							if (step_139 == 1) {
								bot.sendMessage(chatId_128, math_140, {reply_to_message_id:msg.message_id});
								return;
							};
						};
						if (((command.indexOf('wiki ') == 0 || command.indexOf('doc ') == 0)) && (command.length > 5)) {
							const walk = (dir_141, done) => {
								let results_142 = [];
								fs.readdir(dir_141, (err_143, list) => {
									if (err_143) { return done(err_143) };
									let pending = list.length;
									if (!pending) { return done(null, results_142) };
									list.forEach((file) => {
										const file_144 = path.resolve(dir_141, file);
										fs.stat(file_144, (err_145, stat) => { if ((stat != null) && (stat.isDirectory())) { if (!file_144.endsWith('.git')) { walk(file_144, (err_146, res_147) => {
											results_142 = results_142.concat(res_147);
											if (!--pending) { done(null, results_142) };
										}) } else {
											if (!--pending) { done(null, results_142) };
										} } else {
											results_142.push(file_144);
											if (!--pending) { done(null, results_142) };
										} });
									});
								});
							};
							walk(wikiPath, (err_148, results_149) => { walk(wikiPathKernel, (err_150, resultsKernel) => {
								if (!resultsKernel) { return };
								const results_151 = results_149.concat(resultsKernel);
								const resultsText = [];
								const searcher = msg.text.toLowerCase().split(' ');
								searcher.shift();
								for (const result of results_151) {
									Console.log('result{{' + result + '}}');
									const contents = fs.readFileSync(result).toString().split('\n');
									for (const content of contents) {
										if (resultsText.length > 6) { break };
										let has = 0;
										for (const s of searcher) {
											const s = s.toLowerCase();
											Console.log('s{{' + s + '}}');
											Console.log('content{{' + content + '}}');
											if (s.length < 2) { continue };
											if (content.toLowerCase().indexOf(s) != -1) { has++ };
										};
										if (has == searcher.length) {
											resultsText.push(content.trim());
											let result_152 = result.replace(wikiPath, 'https://github.com/GreenteaOS/Greentea/blob/master/');
											result_152 = result_152.replace(wikiPathKernel, 'https://github.com/NotDead/Kernel/wiki/');
											if (result_152.indexOf('https://github.com/NotDead/Kernel/wiki/') == 0) {
												if (result_152.endsWith('.md')) { result_152 = result_152.substr(0, result_152.length - '.md'.length) };
												if (result_152.endsWith('.mediawiki')) { result_152 = result_152.substr(0, result_152.length - '.mediawiki'.length) };
											};
											resultsText.push(result_152);
										};
									};
								};
								if (resultsText.length > 0) { bot.sendMessage(chatId_128, resultsText.join('\n\n'), {reply_to_message_id:msg.message_id}) };
							}) });
							return;
						};
						if (command == '😂😂😂') {
							bot.sendMessage(chatId_128, randomFromArray(['Such fun?', 'Absolutely.']), {reply_to_message_id:msg.message_id});
							return;
						};
						if (command == '😂') {
							bot.sendMessage(chatId_128, randomFromArray(['Yeah', 'he-he', 'ROFL', 'LoL', 'Sure!', '😆', 'I can\'t even...\'']));
							return;
						};
						{
							let step_153 = 0;
							const temp = ['swichpunto', 'switchpunto', 'puntoswich', 'puntoswitch', 'geynj', 'punto'].indexOf(command) != -1;
							let reply = null;
							if (step_153 == 0 && temp != false) {
								reply = msg.reply_to_message;
								step_153 = 1;
							};
							let input = null;
							if (step_153 == 1 && reply != null) {
								input = reply.text;
								step_153 = 2;
							};
							if (step_153 == 2 && input != null) { step_153 = 3 };
							if (step_153 == 3) {
								const gliphs_eng = '`qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./!@#$%^&*()_+|'.split('');
								const gliphs_rus = 'ёйцукенгшщзхъ\\фывапролджэячсмитьбю.!\"№;%:?*()_+/'.split('');
								let output = '';
								for (const gliph of input.split('')) {
									if (gliphs_eng.indexOf(gliph) != -1) { output += gliphs_rus[gliphs_eng.indexOf(gliph)] } else if (gliphs_eng.indexOf(gliph.toLowerCase()) != -1) { output += gliphs_rus[gliphs_eng.indexOf(gliph.toLowerCase())].toUpperCase() } else if (gliphs_rus.indexOf(gliph) != -1) { output += gliphs_eng[gliphs_rus.indexOf(gliph)] } else if (gliphs_rus.indexOf(gliph.toLowerCase()) != -1) { output += gliphs_eng[gliphs_rus.indexOf(gliph.toLowerCase())].toUpperCase() } else output += gliph;
								};
								bot.sendMessage(chatId_128, '☝' + output, {reply_to_message_id:reply.message_id});
								return;
							};
						};
						if ((command.length > 10) && (command.endsWith('😂'))) {
							bot.sendMessage(chatId_128, randomFromArray(['😅', 'Funny', '😂', 'LoL', '👍🏻😄', '😆']), {reply_to_message_id:msg.message_id});
							return;
						};
						if ((false) && (command.startsWith('sticker ')) && (msg.text.length > 'sticker '.length)) {
							let text_154 = msg.text.substr('sticker '.length, Math.round(Math.min(1000, msg.text.length)));
							const tmp_155 = 'temp/' + Math.random() + '_' + Math.random() + '.png';
							if (text_154.split(' ').length < 4) { text_154 = '&nbsp; ' + text_154 + ' &nbsp;' };
							text_154 = text_154.split('<').join('&lt;').split('>').join('&gt;');
							webshot('<!DOCTYPE html><html><body><style>*{font-family: "verdana";-webkit-text-stroke: 5px white;font-size: 50px;}</style><center><b>' + text_154.split(' ').join('</br>') + '</b></center></body></html>', tmp_155, {siteType:'html', screenSize:{width:128, height:20}, shotSize:{width:'all', height:'all'}}, (err_156) => { webp.cwebp(tmp_155, tmp_155 + '.webp', '-q 80', (status_157) => { bot.sendSticker(chatId_128, tmp_155 + '.webp', {reply_to_message_id:msg.message_id}) }) });
							return;
						};
						let rainbow = false;
						let command_158 = command;
						if (command_158 == 'rainbow') {
							command_158 = 'sticker';
							rainbow = true;
						};
						{
							let step_159 = 0;
							const temp_160 = (command_158 == 'sticker' || command_158 == 'get sticker');
							let reply_161 = null;
							if (step_159 == 0 && temp_160 != false) {
								reply_161 = msg.reply_to_message;
								step_159 = 1;
							};
							if (step_159 == 1 && reply_161 != null) { step_159 = 2 };
							if (step_159 == 2) {
								const tmp_162 = 'temp\\' + Math.random() + '_' + Math.random() + '.png';
								reply_161.text = ((reply_161.text) || (''));
								if (reply_161.text.split(' ').length < 4) { reply_161.text = '&nbsp; ' + reply_161.text + ' &nbsp;' };
								reply_161.text = reply_161.text.split('<').join('&lt;').split('>').join('&gt;');
								reply_161.text = reply_161.text.substr(0, Math.round(Math.min(1000, reply_161.text.length)));
								const style = (rainbow)? ('b{\r\n							display: inline-block;\r\n							font-family:"verdana";\r\n							font-size: 50px;\r\n							background:linear-gradient(258.25deg,#00cbff 12%,#7300ff 83%);\r\n							-webkit-background-clip: text;\r\n							-webkit-text-fill-color: transparent;\r\n							-webkit-font-smoothing: antialiased;\r\n						}') : '*{\r\n							font-family: "verdana";\r\n							-webkit-text-stroke: 5px white;\r\n							font-size: 50px;\r\n							-webkit-font-smoothing: antialiased;\r\n						}';
								webshot('<!DOCTYPE html><html><body><style>' + style + '</style><center><b>' + reply_161.text.split(' ').join('</br>') + '</b></center></body></html>', tmp_162, {siteType:'html', screenSize:{width:128, height:20}, shotSize:{width:'all', height:'all'}}, (err_163) => { webp.cwebp(tmp_162, tmp_162 + '.webp', '-q 80', (status_164) => { if (command_158 != 'get sticker') { bot.sendSticker(chatId_128, tmp_162 + '.webp', {reply_to_message_id:reply_161.message_id}) } else {
									bot.sendDocument(chatId_128, tmp_162 + '.webp', {reply_to_message_id:reply_161.message_id});
								} }) });
								return;
							};
						};
						if ((command_158 == 'explain') && (isAdmin)) {
							{
								let step_165 = 0;
								const grammarReason_166 = grammarReason;
								if (step_165 == 0 && grammarReason_166 != null) { step_165 = 1 };
								if (step_165 == 1) { bot.sendMessage(chatId_128, grammarReason_166, {reply_to_message_id:msg.message_id}) } else bot.sendMessage(chatId_128, 'I misremember...', {reply_to_message_id:msg.message_id});
							};
							return;
						};
						if (command_158 == 'shrug' || command_158 == 'dunno') {
							{
								let step_167 = 0;
								const reply_168 = msg.reply_to_message;
								if (step_167 == 0 && reply_168 != null) { step_167 = 1 };
								if (step_167 == 1) {
									bot.sendMessage(chatId_128, '¯\\_(ツ)_/¯', {reply_to_message_id:reply_168.message_id});
									return;
								};
							};
							bot.sendMessage(chatId_128, '¯\\_(ツ)_/¯');
							return;
						};
						const shouldGrammar = (username_169) => { return [].indexOf((((username_169) || (''))).toLowerCase()) != -1 };
						const isCode = (text_170) => {
							const text_171 = text_170.split('://').join('');
							if (text_171.indexOf('\n') == -1) { return false };
							if ((text_171.indexOf('void ') != -1) || (text_171.indexOf('{') != -1) || (text_171.indexOf('//') != -1)) { return true };
							return false;
						};
						if (isCode(msg.text)) {
							let notFine = true;
							{
								let step_172 = 0;
								const entities_173 = msg.entities;
								if (step_172 == 0 && entities_173 != null) { step_172 = 1 };
								if (step_172 == 1) { for (const entitie of entities_173) {
									if (entitie == null) { continue };
									if (entitie.type == 'code') { notFine = false };
									if (entitie.type == 'pre') { notFine = false };
								} };
							};
							if (notFine) { bot.sendMessage(chatId_128, 'Use ``` for code formatting!', {reply_to_message_id:msg.message_id}) };
						};
						if (command_158.indexOf('affected subsystems ') > -1) {
							let link_174 = command_158.replace('affected subsystems ', '').trim();
							if (link_174.length < 3) {
								bot.sendMessage(chatId_128, 'You need to specify the repository name and the request id, for example:\r\nAffected subsystems https://github.com/GreenteaOS/Kernel/pull/18', {reply_to_message_id:msg.message_id});
								return;
							};
							link_174 += '.diff';
							bot.sendMessage(chatId_128, 'Now I\'ll check out this pull-quest...', {reply_to_message_id:msg.message_id});
							const options_175 = {url:link_174, encoding:'utf8'};
							Curl.request(options_175, (err_176, result_177) => { if (err_176 == null) {
								const base = new Buffer(result_177, 'utf8').toString();
								const m = ['Patch size: ' + base.split('\n').length + ' lines.'];
								const diffs = base.split('diff --git a');
								const files = [];
								const subs = [];
								for (const diff of diffs) {
									if (diff.length <= 1) { continue };
									const fname = diff.split('\n')[0].split(' b/')[0];
									files.push(fname);
									const sub = fname.split('/')[1];
									if (subs.indexOf(sub) == -1) { subs.push(sub) };
								};
								m.push('');
								m.push('Affected files:');
								for (const file of files) {
									m.push(file);
								};
								const unsafe = ['dll', 'drivers', 'hal', 'ntoskrnl', 'subsystems', 'win32ss'];
								m.push('');
								m.push('Affected subsystems:');
								for (const sub of subs) {
									m.push((unsafe.indexOf(sub) > -(1)? ('⚠️') : '') + sub);
								};
								bot.sendMessage(chatId_128, m.join('\r\n'), {reply_to_message_id:msg.message_id});
							} else bot.sendMessage(chatId_128, 'Failed to fetch: ' + err_176.toString(), {reply_to_message_id:msg.message_id}) });
							return;
						};
						if (!isCode(msg.text)) { if (((shouldGrammar(msg.from.username) || (msg.forward_from != null && shouldGrammar(msg.forward_from.username)))) && (msg.text != '')) {
							grammarReason = 'Corrected this message:\n' + msg.text;
							grammarReason += '\n\nAt least with the following edits:';
							let output_178 = msg.text.trim();
							const addAbout = (about) => { if ((about != null) && (grammarReason.indexOf(about) == -1)) { grammarReason += '\n' + about } };
							const replaceIf = (what, to, about_179) => { while (output_178.indexOf(what) != -1) {
								addAbout(about_179);
								output_178 = output_178.split(what).join(to);
							} };
							replaceIf('i.e ', 'i.e. ', null);
							replaceIf('  ', ' ', 'Joined multiple spaces into single one');
							replaceIf(')))', '))', 'Cleaned the extra braces');
							replaceIf('))', '😁', 'Replaced the double braces to the unicode smiley');
							replaceIf(' ?', '?', 'Cleaned extra spaces before punctuation marks');
							replaceIf(' !', '!', 'Cleaned extra spaces before punctuation marks');
							replaceIf(' .', '.', 'Cleaned extra spaces before punctuation marks');
							replaceIf(' ;', ';', 'Cleaned extra spaces before punctuation marks');
							replaceIf(' :', ':', 'Cleaned extra spaces before punctuation marks');
							replaceIf(' ,', ',', 'Cleaned extra spaces before punctuation marks');
							replaceIf(', ', ',', 'Corrected spaces after signs');
							output_178 = output_178.split(',').join(', ').trim();
							replaceIf('. .', '..', 'Replaced ... to unicode dots');
							replaceIf('....', '...', 'Cleaned the extra dots');
							replaceIf('...', '…', 'Replaced ... to unicode dots');
							replaceIf('..', '.', 'Cleaned the extra dots');
							const words = new Map([['видухи', 'видеокарты'], ['ати', 'AMD'], ['кгото', 'кого-то'], ['встановить', 'восстановить'], ['мксимум', 'максимум'], ['предусмотрно', 'предусмотрено'], ['лямов', 'миллионов'], ['протые', 'простые'], ['валяеться', 'валяется'], ['лишняяя', 'лишняя'], ['гтк', 'GTK'], ['некаму', 'никому'], ['павильно', 'правильно'], ['йа', 'я'], ['йя', 'я'], ['ишо', 'ещё'], ['миня', 'меня'], ['таго', 'того'], ['тож', 'тоже'], ['иза', 'из-за'], ['шо', 'что'], ['идияльная', 'идеальная'], ['орфогравий', 'орфография'], ['ёжег', 'ёжик'], ['йетот', 'этот'], ['арфограф', 'орфограф'], ['чтоб', 'чтобы'], ['резо', 'резко'], ['идеии', 'идее'], ['огранчено', 'ограничено'], ['йентот', 'этот']]);
							const toTitleCase = (str) => {
								if (str.length <= 1) { return str.toUpperCase() };
								return str.charAt(0).toUpperCase() + str.substr(1);
							};
							const out = [];
							for (const part of output_178.split(' ')) {
								if (part == '') { continue };
								let part = part;
								for (const word of words.keys()) {
									Console.log('space(' + part + ')', '[' + word + ']', '{' + words.get(word) + '}');
									addAbout('Fixed spelling');
									if (word == part) { part = words.get(word) };
									if ((word + ',') == part) { part = words.get(word) + ',' };
									if ((word + '.') == part) { part = words.get(word) + '.' };
									if (toTitleCase(word) == part) { part = toTitleCase(words.get(word)) };
								};
								out.push(part);
							};
							output_178 = out.join(' ').trim();
							const outs = [];
							for (const part of output_178.split(', ')) {
								if (part == '') { continue };
								let part_180 = part;
								for (const word of words.keys()) {
									Console.log('comma(' + part_180 + ')', '[' + word + ']', '{' + words.get(word) + '}');
									addAbout('Fixed spelling');
									if (word == part_180) { part_180 = words.get(word) };
									if (toTitleCase(word) == part_180) { part_180 = toTitleCase(words.get(word)) };
								};
								outs.push(part_180);
							};
							output_178 = outs.join(', ').trim();
							let o = '';
							for (const t of output_178.split('.')) {
								const t = t.trim();
								o += t.substr(0, 1).toUpperCase();
								o += t.substr(1);
								const ends = '?;:,.!…😁😂👍)(';
								if (ends.indexOf(t.substr(-1, 1)) == -1) {
									o += '. ';
									addAbout('Added dots at the ends of sentences');
								} else o += ' ';
							};
							output_178 = o;
							if (!msg.text.trim().endsWith('.')) { msg.text = msg.text.trim() + '.' };
							if (msg.text.trim().toLowerCase() != output_178.trim().toLowerCase()) {
								grammarReason += '\nAs a result:\n' + output_178.trim();
								bot.sendMessage(chatId_128, 'Fixed:\r\n' + output_178.trim(), {reply_to_message_id:msg.message_id});
								return;
							};
						} };
						if (msg.entities != null) { for (const entitie of msg.entities) {
							if (entitie.type == 'mention') {
								const mention = msg.text.substr(entitie.offset, entitie.length);
								if (mention == '@peytys_bot') {
									bot.sendMessage(chatId_128, Bot.help, {reply_to_message_id:msg.message_id});
									return;
								};
							};
						} };
						if (command_158.indexOf('magic') > -1) {
							bot.sendMessage(chatId_128, ['```', ' ∧＿∧ ', '( ･ω･｡)つ━☆・*。', '⊂  ノ    ・゜+. ', 'しーＪ   °。+ *´¨) ', '         .· ´¸.·*´¨) ¸.·*¨) ', '          (¸.·´ (¸.·\'* ☆ ', '```'].join('\r\n'), {parse_mode:'Markdown', reply_to_message_id:msg.message_id});
							return;
						};
						if (command_158 == 'ping') {
							bot.sendMessage(chatId_128, 'Pong⚠️', {reply_to_message_id:msg.message_id});
							return;
						};
					}
				} catch (e) {
					{
						bot.sendMessage(Bot.admin_chat, 'Oops exception ¯\\_(ツ)_/¯' + '\n\n' + e);
					}
				};
			});
			const handler = createHandler({path:'/github-webhook-handler', secret:'application/x-www-form-urlencoded'});
			http.createServer((req, res_181) => { handler(req, res_181, (err_182) => {
				res_181.statusCode = 404;
				res_181.end('<html><head><meta charset="UTF-8"></head><body>What can I do for you?');
			}) }).listen(3009);
			handler.on('error', (err_183) => { Console.error('Error:', err_183.message) });
			handler.on('ping', (event_184) => {
				Console.log(JSON.stringify(event_184.payload.repository));
				bot.sendMessage(Bot.admin_chat, 'Ping from GitHub: ' + JSON.stringify(event_184.payload.repository.full_name));
			});
			const tagToIssue = (text_185, issues) => { return text_185.split('#').join(issues) };
			const ccToUser = (text_186) => { return text_186.split('@').join('https://github.com/') };
			const gitFormat = {parse_mode:'HTML', disable_web_page_preview:true};
			handler.on('push', (event_187) => {
				Console.log('Received a push event: ' + JSON.stringify(event_187.payload));
				const count = (event_187.payload.commits.length);
				if (count < 1) { return };
				const head = ('🔨 <a href=\"' + (event_187.payload.compare) + '\">') + count + ' new commit' + (count > (1)? ('s') : '') + '</a> ' + '<b>to</b> <a href="' + event_187.payload.repository.html_url + '">' + event_187.payload.repository.name + '</a>\n\n';
				const commits = event_187.payload.commits;
				const body = '' + (() => {
					const result_188 = [];
					const value_189 = commits;
					for (const commit of value_189) result_188.push('<a href="' + commit.url + '">' + commit.id.substr(0, 7) + '</a>: ' + tagToIssue(commit.message, event_187.payload.repository.html_url + '/issues/') + '' + ' <b>by</b> <a href="https://github.com/' + commit.author.username + '">' + commit.author.name + '</a>');
					return result_188;
				})().join('\n');
				const result_190 = head + body;
				bot.sendMessage(Bot.admin_chat, result_190, gitFormat);
				if (event_187.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, result_190, gitFormat) };
				if (event_187.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, result_190, gitFormat) };
			});
			handler.on('issues', (event_191) => {
				if (event_191.payload.action != 'opened') { return };
				const repository = event_191.payload.repository;
				const issue = event_191.payload.issue;
				let text_192 = '❕ <b>New issue</b> ';
				text_192 += '<a href="' + issue.html_url + '">';
				text_192 += repository.name;
				text_192 += '#' + issue.number;
				text_192 += ' ' + issue.title + '</a>';
				text_192 += '\n<b>by</b> <a href="' + issue.user.html_url + '">' + issue.user.login + '</a>\n\n';
				text_192 += '' + ccToUser(tagToIssue(issue.body, repository.html_url + '/issues/'));
				bot.sendMessage(Bot.admin_chat, text_192, gitFormat);
				if (event_191.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, text_192, gitFormat) };
				if (event_191.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, text_192, gitFormat) };
			});
			handler.on('issue_comment', (event_193) => {
				if (event_193.payload.action != 'created') { return };
				const comment = event_193.payload.comment;
				const repository_194 = event_193.payload.repository;
				const issue_195 = event_193.payload.issue;
				let text_196 = '💬 <b>New comment on</b> ';
				text_196 += '<a href="' + comment.html_url + '">';
				text_196 += repository_194.name;
				text_196 += '#' + issue_195.number;
				text_196 += ' ' + issue_195.title + '</a>';
				text_196 += '\n<b>by</b> <a href="' + comment.user.html_url + '">' + comment.user.login + '</a>\n\n';
				text_196 += '' + ccToUser(tagToIssue(comment.body, repository_194.html_url + '/issues/'));
				bot.sendMessage(Bot.admin_chat, text_196, gitFormat);
				if (event_193.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, text_196, gitFormat) };
				if (event_193.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, text_196, gitFormat) };
			});
			handler.on('watch', (event_197) => {
				Console.log('Received a watch event for %s to %s', event_197.payload.repository.name, event_197.payload.ref);
				const message_198 = ['<a href="' + event_197.payload.sender.html_url + '">@' + event_197.payload.sender.login + '</a> stargazed <a href="' + event_197.payload.repository.html_url + '">' + event_197.payload.repository.full_name + '</a> repo!', 'Stars: ⭐️' + (event_197.payload.repository.stargazers_count + 1), 'Forks: 🔗' + event_197.payload.repository.forks_count].join('\r\n');
				bot.sendMessage(Bot.admin_chat, message_198, gitFormat);
				if (event_197.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, message_198, gitFormat) };
				if (event_197.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, message_198, gitFormat) };
				if (event_197.payload.repository.html_url.indexOf('Greentea') > 0) {
					const message_199 = ['<a href="' + event_197.payload.sender.html_url + '">@' + event_197.payload.sender.login + '</a> stargazed <a href="' + event_197.payload.repository.html_url + '">' + event_197.payload.repository.full_name + '</a> repo!', 'Stars: ⭐️' + (event_197.payload.repository.stargazers_count + 1), 'Forks: 🔗' + event_197.payload.repository.forks_count, 'Follow GitHub updates at @greenteaos_github' + randomFromArray(['🦄', '🐼', '🐶', '🐹', '🦊', '🦁', '🐝', '🐠', '🐙', '🦑'])].join('\r\n');
					bot.sendMessage(Bot.greenteaos, message_199, gitFormat);
				};
				if (event_197.payload.repository.html_url.indexOf('hexalang') > 0) {
					const message_200 = ['<a href="' + event_197.payload.sender.html_url + '">@' + event_197.payload.sender.login + '</a> stargazed <a href="' + event_197.payload.repository.html_url + '">' + event_197.payload.repository.full_name + '</a> repo!', 'Stars: ⭐️' + (event_197.payload.repository.stargazers_count + 1), 'Forks: 🔗' + event_197.payload.repository.forks_count, 'Follow GitHub updates at @hexalang_github' + randomFromArray(['🦄', '🐼', '🐶', '🐹', '🦊', '🦁', '🐝', '🐠', '🐙', '🦑'])].join('\r\n');
					bot.sendMessage(Bot.hexalang, message_200, gitFormat);
				};
			});
			handler.on('fork', (event_201) => {
				Console.log('Received a fork event for %s to %s', event_201.payload.repository.name, event_201.payload.ref);
				const message_202 = ['Appeared 🔗fork🔗 at ' + event_201.payload.forkee.html_url, 'Hoping for patches to the main repository!', 'Total forks count: 🔗' + (event_201.payload.repository.forks_count + 0)].join('\r\n');
				bot.sendMessage(Bot.admin_chat, message_202, gitFormat);
				if (event_201.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, message_202, gitFormat) };
				if (event_201.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, message_202, gitFormat) };
			});
			handler.on('pull_request_review', (event_203) => {
				Console.log('Received an event for %s to %s', event_203.payload.repository.name, event_203.payload.ref);
				if (event_203.payload.action == 'submitted') {
					const message_204 = ['Patch got review ' + event_203.payload.review.html_url];
					if ((event_203.payload.review.body != null) && (event_203.payload.review.body.length > 0)) {
						message_204.push('');
						message_204.push('New comment from maintainer ' + event_203.payload.review.user.html_url + '');
						message_204.push('"' + event_203.payload.review.body + '"');
					};
					if (event_203.payload.review.state == 'approved') {
						message_204.push('');
						message_204.push('State: 🎉APPROVED!🎉');
					};
					bot.sendMessage(Bot.admin_chat, message_204.join('\r\n'));
					if (event_203.payload.review.state == 'approved') { bot.sendSticker(Bot.admin_chat, 'CAADAwADhQEAAu_thAXDSDqVrNRJjQI') };
					if (event_203.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, message_204.join('\r\n'), gitFormat) };
					if (event_203.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, message_204.join('\r\n'), gitFormat) };
				};
			});
			handler.on('status', (event_205) => {
				const repository_206 = event_205.payload.repository;
				let text_207 = '🚧 <b>' + event_205.payload.description + '</b>\n';
				text_207 += '<b>For repository</b> <a href="' + repository_206.html_url + '">';
				text_207 += repository_206.full_name + '</a>\n';
				if (event_205.payload.commit != null) {
					text_207 += '<b>For commit</b> <a href="' + event_205.payload.commit.html_url + '">';
					text_207 += (((event_205.payload.commit.commit.message) || ('show commit'))) + '</a>\n';
				};
				text_207 += '\n';
				if (event_205.payload.target_url) { text_207 += 'ℹ️ <a href="' + event_205.payload.target_url + '">More information</a>\n' };
				if (event_205.payload.state == 'success') { text_207 += '⤵️ <a href="' + event_205.payload.target_url + '/artifacts">Download artifacts</a>' };
				bot.sendMessage(Bot.admin_chat, text_207, gitFormat);
				if (event_205.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, text_207, gitFormat) };
				if (event_205.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, text_207, gitFormat) };
			});
			handler.on('pull_request', (event_208) => {
				if (event_208.payload.action != 'opened') { return };
				const repository_209 = event_208.payload.repository;
				const pull_request = event_208.payload.pull_request;
				let text_210 = '🔌 <b>New pull request</b> ';
				text_210 += '<a href="' + pull_request.html_url + '">';
				text_210 += repository_209.name;
				text_210 += '#' + pull_request.number;
				text_210 += ' ' + pull_request.title + '</a>';
				text_210 += '\n<b>by</b> <a href="' + pull_request.user.html_url + '">' + pull_request.user.login + '</a>\n\n';
				text_210 += '' + ccToUser(tagToIssue(pull_request.body, repository_209.html_url + '/issues/'));
				bot.sendMessage(Bot.admin_chat, text_210, gitFormat);
				if (event_208.payload.repository.html_url.indexOf('Greentea') > 0) { bot.sendMessage(Bot.greenteaos_github, text_210, gitFormat) };
				if (event_208.payload.repository.html_url.indexOf('hexalang') > 0) { bot.sendMessage(Bot.hexalang_github, text_210, gitFormat) };
			});
			handler.on('repository', (event_211) => {
				const action = event_211.payload.action;
				const orgName = event_211.payload.organization.login;
				const repoLink = event_211.payload.repository.html_url;
				const repoDescription = ((event_211.payload.repository.description) || (''));
				{
					const temp_212 = action;
					switch (temp_212) {
					case 'created': {
						{
							const respond = ('New repo created in ' + (orgName) + '! ' + (repoLink) + '\n\n' + (repoDescription) + '');
							bot.sendMessage(Bot.admin_chat, respond);
						}
					} break;
					};
				};
			});
			handler.on('page_build', (event_213) => {
				const status_214 = event_213.payload.build.status;
				const orgName_215 = event_213.payload.organization.login;
				if (status_214 != 'built') { return };
				const respond_216 = ('Jekyll build for ' + (orgName_215) + ' is complete! Info: ' + (event_213.payload.build.url) + '');
				bot.sendMessage(-1001183305589, respond_216);
			});
		} };
	}
	Bot.greenteaos_news = -1001363591575
	Bot.greenteaos = -1001185216943
	Bot.greenteaos_github = -1001305539762
	Bot.hexalang = -1001317592810
	Bot.hexalang_news = -1001137559156
	Bot.hexalang_github = -1001300915833
	Bot.admin_chat = 609463140
	Bot.admin_id = 609463140
	Bot.stickerAttention = 'CAADAgADTQUAAp2mfwNRlOzArC6mzQI'
	Bot.english = [Bot.greenteaos_news, Bot.hexalang_news]
	Bot.help = 'I understand only simple speech. Ask me through the @peytys_bot and text of the command. Sometimes I will read texts of messages from groups. Send ping to check if I\'m online.\nSource code and issues: https://github.com/PeyTy/PeyTys_Bot'
	Bot.translit = (text_109) => { return text_109.replace(new RegExp('[а-яА-Я]', 'g'), (match) => ('_x' + match.charCodeAt() + 'x_')) };
	Bot.detranslit = (text_110) => { return text_110.replace(new RegExp('_x(\\d+)x_', 'g'), (match_111, code) => { return String.fromCharCode(code) }) };
	Bot.calculate = (expression) => { {
			const math = require('mathjs');
			if ((Global.isNaN(expression) == true) && (expression != '""') && (expression != 'true') && (expression != 'false')) { try {
				{
					let text_112 = expression.toLowerCase();
					text_112 = text_112.split('∞').join('Infinity');
					text_112 = text_112.split('π').join('pi');
					text_112 = text_112.split('infinity').join('Infinity');
					const scope = {last:null};
					math.eval(Bot.translit(text_112), scope);
					text_112 = 'cbrt(x)=x^(1/3)\nfmod(a,b)=a%b\nNaN\n' + text_112;
					const result = math.eval(Bot.translit(text_112), scope);
					Console.log('math.eval', result, undefined);
					if (result != undefined) {
						Console.log('math.eval != undefined');
						const format = (result_113) => {
							if (((result_113) instanceof (Function))) { return 'function' };
							if (((typeof(result_113) == 'object')) && (result_113.entries != null)) {
								const r = result_113.entries.pop();
								if (((r) instanceof (Function))) { throw null };
								return format(r);
							};
							Console.log('math.eval 2');
							if ((result_113.unit) && (result_113.value != null)) { return result_113.value + ' ' + result_113.unit.name };
							if ((result_113.re != null) && (result_113.im != null)) { return result_113.re + ' + ' + result_113.im + 'i' };
							if (Global.isNaN(result_113)) { throw null };
							if (typeof(result_113) == 'number') { return result_113 };
							throw null;
						};
						return '' + format(result);
					};
				}
			} catch (e) {
				{
					return null;
				}
			} } else {
				return null;
			};
		} };
	Bot.evaluator = (text_114) => { {
			const code_115 = '(function(){let window=null;let console=null;\n' + text_114 + '\n/**/\nreturn \'Use `return`\';})()';
			return '' + eval(code_115);
		} };
	{
		{
			{
				new Bot();
				const version = JSON.parse(require('fs').readFileSync(__dirname + '/package.json')).version;
				Console.log('PeyTy\'s Bot', version);
			};
		}
	}
}