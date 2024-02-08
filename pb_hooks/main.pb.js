routerAdd('post', 'api/custom/post/:postId/share', (c) => {
	try {
		let user = $apis.requestInfo(c)?.authRecord?.id;
		if (!user) {
			return c.json(401, {
				code: 401
			});
		}
		const message = new MailerMessage({
			from: {
				address: $app.settings().meta.senderAddress,
				name: $app.settings().meta.senderName
			},
			to: [{ address: 'kooper.lingohr@gmail.com' }],
			subject: 'YOUR_SUBJECT...',
			html: 'YOUR_HTML_BODY...'
		});

		$app.newMailClient().send(message);

		return c.json(200, {
			code: 200
		});
	} catch (e) {
		return c.json(500, {
			code: 500,
			message: e
		});
	}
});
