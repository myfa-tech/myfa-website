import axios from 'axios'

class Lydia {
  configKeys	= [
		'vendor_token',
		'amount',
		'recipient',
		'order_ref',
		'browser_success_url',
		'browser_cancel_url',
		'confirm_url',
		'sale_desc',
		'payer_desc',
		'collector_desc',
		'expire_time',
		'end_date',
		'provider_token',
		'payment_recipient',
		'notify_payer',
		'notify_collector',
		'display_conf',
		'payment_method',
		'env',
		'render'
	];

	configToSkip = [
		'env',
		'render'
	];

	baseUrl	= 'https://lydia-app.com/';
	isRunning 	= false;

	init = (data) => {
		if (data.env === 'test') {
			this.baseUrl	= 'https://homologation.lydia-app.com/';
		}
	}

	sendRequest = (requestData) => {
		const data = {
			vendor_token		: '',
			amount				: '',
			recipient			: '',
			order_ref 			: '',
			browser_success_url : '',
			browser_cancel_url 	: '',
			confirm_url 		: '',
			sale_desc 			: '',
			payer_desc 			: '',
			collector_desc 		: '',
			expire_time 		: '',
			end_date 			: '',
			provider_token 		: '',
			payment_recipient	: '',
			notify_payer 		: '',
			notify_collector 	: '',
			display_conf 		: '',
			payment_method		: 'auto',
			currency			: 'EUR',
			type				: 'phone'
		};

		if (this.isRunning === false) {
			this.isRunning = true;

			this.configKeys.forEach((configKey) => {
				if (!this.configToSkip.includes(configKey) && requestData[configKey]) {
					data[configKey] = requestData[configKey];
				}
			})

			axios.post(`${this.baseUrl}api/request/do.json`, data)
				.then(data => {
					console.log({ data })
					if (data.error == 0) {
						document.location = data.mobile_url;
					} else {
						console.log(data);
					}
				})
				.catch(err => {
					console.log(err);
				})
		}
	}
}

export default Lydia
