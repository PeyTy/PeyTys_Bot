"use strict"
const TelegramTDLib = require('./telegramTDLib')

class TelegramBot {
	constructor(token, options = {}) {
		TelegramBot.td = new TelegramTDLib(token, this.handler)
	}

	on(name, handler) {
		console.log('on', name)
		if (name == 'inline_query') {
			TelegramBot.inline_query_handler = handler
		}
		if (name == 'message') {
			TelegramBot.message_handler = handler
		}
	}

	async sendMessage(chatId, text, format) {
		let parse_mode = { '@type': 'textParseModeMarkdown' }

		if (format && format.parse_mode == 'Markdown') parse_mode = { '@type': 'textParseModeMarkdown' }
		if (format && format.parse_mode == 'HTML') parse_mode = { '@type': 'textParseModeHTML' }

		let text_formatted = await TelegramBot.td.fetch({
			"@type": "parseTextEntities",
			"text": text,
			"parse_mode": parse_mode
		})

		await TelegramBot.td.send({
			'@type': 'sendMessage',
			chat_id: chatId,
			reply_to_message_id: (format && format.reply_to_message_id) || 0,
			input_message_content: {
				'@type': 'inputMessageText',
				text: text_formatted,
				disable_web_page_preview: format.disable_web_page_preview || false,
				clear_draft: true
			}
		})
	}

	async sendSticker(chatId, stickerIdOrFile, options) {
		if (stickerIdOrFile.indexOf('.') > 0) {
			return
		} else {
		}
	}

	async answerInlineQuery(inline_query_id, results, options) {
		const result = []
		for (const res of results) {
			if (res.type == "article") {
				const r = { "@type": "inputInlineQueryResultArticle" }
				r.id = res.id
				r.url = undefined
				r.hide_url = true
				r.title = res.title
				r.description = res.description
				r.thumbnail_url = undefined
				r.thumbnail_width = undefined
				r.thumbnail_height = undefined
				r.reply_markup = null
				r.input_message_content = {
					'@type': 'inputMessageText',
					text: await TelegramBot.td.fetch({
						"@type": "parseTextEntities",
						"text": res.input_message_content.message_text,
						"parse_mode": { '@type': 'textParseModeMarkdown' }
					}),
					clear_draft: true
				}
				result.push(r)
				continue
			}

			if (res.type == "sticker") {
				continue
				const r = { "@type": "inputInlineQueryResultSticker" }
				r.id = res.id
				r.thumbnail_url = undefined
				r.sticker_url = res.sticker_file_id
				r.sticker_width = 128
				r.sticker_height = 20
				r.reply_markup = null
				r.input_message_content = {
					'@type': 'inputMessageText',
					thumbnail: undefined,
					width: 128,
					height: 20
				}
				result.push(r)
			}
		}

		await TelegramBot.td.send({
			"@type": "answerInlineQuery",
			"inline_query_id": inline_query_id,
			"is_personal": false,
			"results": result,
			"cache_time": options.cache_time,
			"next_offset": '',
			"switch_pm_text": undefined,
			"switch_pm_parameter": undefined
		})
	}

	kickChatMember() {
	}

	async sendDocument() {
	}

	startPolling() {
		// nothing
	}

	async handler(update) {
		if ((update['@type'] == 'updateNewMessage') && (update.message.content['@type'] == 'messageText')) {
			console.log('messageText', update.message.content.text)
			if (TelegramBot.message_handler == null) return;

			if (TelegramBot.users == null) TelegramBot.users = new Map()

			const getFrom = (message) => {
				return { id: message.sender_user_id }
			}

			const getChat = (message) => {
				return { id: message.chat_id }
			}

			const result = {
				message_id: update.message.id,
				from: getFrom(update.message),
				chat: getChat(update.message),
				date: update.message.date,
				text: update.message.content.text.text
			}

			result.from.is_bot = false
			result.from.first_name = 'undefined'
			result.from.language_code = 'en-US'

			result.chat.title = 'undefined'
			result.chat.type = 'supergroup'

			if (update.message.reply_to_message_id != 0) {
				result.reply_to_message = {}
				result.reply_to_message.id = update.message.reply_to_message_id
			}

			TelegramBot.message_handler(result)
			return;
		}

		if (update['@type'] == 'updateNewInlineQuery') {
			const result = {}

			result.id = update.id
			result.query = update.query
			result.from = { first_name: '' + update.sender_user_id }
			result.offset = update.offset

			TelegramBot.inline_query_handler(result)
			return;
		}
	}
}

module.exports = TelegramBot
