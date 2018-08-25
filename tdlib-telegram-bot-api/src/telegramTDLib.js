"use strict"
const path = require('path')
const uuidv4 = require('uuid/v4')
const ref = require('ref')
const ffi = require('ffi-napi')

const emptyFunction = () => {}
const tdlib = ffi.Library(path.resolve(process.cwd(), "tdjson.dll"), {
	'td_json_client_create': [ref.refType('void'), []],
	'td_json_client_send': [ref.types.void, [ref.refType('void'), ref.types.CString]],
	'td_json_client_receive': [ref.types.CString, [ref.refType('void'), ref.types.double]],
	'td_json_client_execute': [ref.types.CString, [ref.refType('void'), ref.types.CString]],
	'td_json_client_destroy': [ref.types.void, [ref.refType('void')]],
	'td_set_log_verbosity_level': [ref.types.void, [ref.types.int]],
	'td_set_log_file_path': [ref.types.void, [ref.types.CString]],
})

tdlib.td_set_log_verbosity_level(1)

const buildQuery = (query) => {
	const buffer = Buffer.from(JSON.stringify(query) + '\0', 'utf-8')
	buffer.type = ref.types.CString
	return buffer
}

class TelegramTDLib {
	constructor(token, handler) {
		this.token = token
		this.handler = handler
		this.fetching = {}
		this.listeners = {
			"_update": [],
			"_error": [],
		}
		this.init()
	}

	async init() {
		try {
			this.client = await this.create()
			this.loop()
		} catch (error) {
			console.log(`Error while creating client:`, error)
		}
	}

	async loop() {
		try {
			const update = await this.receive()
			if (!update) {
				return this.loop()
			}
			switch (update['@type']) {

				case 'updateConnectionState':
					{
						if (update.state['@type'] == 'connectionStateReady') {
						}
					};
					break
				case 'updateAuthorizationState':
					switch (update.authorization_state['@type']) {
						case 'authorizationStateWaitTdlibParameters':
							{
								await this.send({
									'@type': 'setTdlibParameters',
									'parameters': {
										'@type': 'tdlibParameters',
										'database_directory': require('path').resolve(process.cwd(), 'temp-' + this.token.split(':')[0]),
										'files_directory': require('path').resolve(process.cwd(), 'temp-' + this.token.split(':')[0]),
										'use_message_database': false,
										'use_secret_chats': false,
										'use_file_database': true,
										'use_chat_info_database': true,
										'system_language_code': 'en',
										'application_version': '1.0',
										'device_model': 'tdbot',
										'system_version': 'node',
										'enable_storage_optimizer': false,
									},
								})
								break
							};
						case 'authorizationStateWaitEncryptionKey':
							{
								await this.send({
									'@type': 'checkDatabaseEncryptionKey',
								})
								break
							};
						case 'authorizationStateWaitPhoneNumber':
							await this.send({
								'@type': 'checkAuthenticationBotToken',
								token: this.token
							})
							break
					};
					break
				case 'error':
					{
						await this.handleError(update)
					};
					break
				case 'updateNewMessage':
					await this.handler(update)
					break
				case 'updateNewInlineQuery':
					await this.handler(update)
					break

				default:
					const id = update['@extra']
					if (this.fetching[id]) {
						delete update['@extra']
						this.fetching[id].resolver(update)
						delete this.fetching[id]
					} else {
						for (const lisner of this.listeners['_update']) {
							lisner.call(null, _convert(update));
						}
					}
					break
			}
		} catch (error) {
			console.log(`Error in loop:`, error)
		}
		this.loop()
	}

	receive(timeout = 10) {
		return new Promise((resolve, reject) => {
			tdlib.td_json_client_receive.async(this.client, timeout, (err, response) => {
				if (err) {
					return reject(err)
				}
				if (!response) {
					return resolve(null)
				}
				resolve(JSON.parse(response))
			})
		})
	}

	create() {
		return new Promise((resolve, reject) => {
			tdlib.td_json_client_create.async((err, client) => {
				if (err) {
					return reject(err)
				}
				resolve(client)
			})
		})
	}

	send(query) {
		return new Promise((resolve, reject) => {
			tdlib.td_json_client_send.async(this.client, buildQuery(query), (err, response) => {
				if (err) {
					console.log('Error send:', err)
					return reject(err)
				}
				if (!response) {
					return resolve(null)
				}
				resolve(JSON.parse(response))
			})
		})
	}

	async fetch(query) {
		const id = uuidv4();
		query['@extra'] = id;
		const receiveUpdate = new Promise((resolve, reject) => {
			this.fetching[id] = { resolver: resolve, rejector: reject };
			setTimeout(() => {
				delete this.fetching[id];
				reject('Query timed out after 99 seconds. ' + JSON.stringify(query));
			}, 1000 * 99);
		});
		await this.send(query);
		const result = await receiveUpdate;
		return result;
	}

	async handleError(update) {
		console.log('Error:', update)
	}
}

module.exports = TelegramTDLib
