/*
 * jQuery Dynamic Form
 *
 * https://github.com/gneutzling/jquery-dynamicform
 *
 * Authored by Gabriel Neutzling
 * http://www.gneutzling.com
 * @gneutzling
 *
 * Copyright 2014, Gabriel Neutzling
 * Released under the MIT license
 *
 */

(function ($) {
	
	$.fn.dynamicform = function (options) {

		/**
		 * Configures options and scope element.
		 */
		var scope = $(this),
			settings = $.extend({
				token: '62bb61431348e22850828a5829c4373faafe29c1',
				secret: '51a266c2844ccd5cac83d88de88d82d05358aa51',
				fields: {
					states: ['PR', 'SC', 'SP', 'RS'],
					level: ['Iniciante', 'Intermediário', 'Avançado', 'Ninja']
				}
			}, options);


		/**
		 * Init is like a summary of process.
		 */
		var init = function () {
			create();
			bind();	
		};


		/**
		 * Concatenates all html for each field and append in HTML.
		 */
		var create = function () {
			var html = [];

			html.push(getInputHTML());

			$.each(settings.fields, function (key, value) {
				html.push(getSelectHTML(key, value));
			});

			html.push(getButtonHTML());

			scope.append(html.join(''));
		};


		/**
		 * Creates HTML for default input elements.
		 * @return {array} Object array containing the HTML to be attached.
		 */
		var getInputHTML = function () {
			var str = [];

			str.push('<label for="name">Nome</label>');
			str.push('<input type="text" name="name" id="name" required>');
			str.push('<label for="email">Email</label>');
			str.push('<input type="text" name="email" id="email" required>');

			return str;
		};


		/**
		 * Creates HTML for select elements.
		 * @param  {string} field   The name and id of select element.
		 * @param  {array}  options An object array with options.
		 * @return {array}          Object array containing the HTML to be appended.
		 */
		var getSelectHTML = function (field, options) {
			var str = [];

			str.push('<select name="' + field + '" id="' + field + '">');

			for (var i = 0, len = options.length; i < len; i++) {
				str.push('<option value="' + options[i] + '">' + options[i] + '</option>');
			}

			str.push('</select>');

			return str;
		};


		/**
		 * Creates HTML for send button element.
		 * @return {array} Object array containing the HTML to be attached.
		 */
		var getButtonHTML = function () {
			var str = [];

			str.push('<button type="submit">Enviar</button>');

			return str;
		};


		/**
		 * General bind elements.
		 */
		var bind = function () {
			scope.on('submit', function () {
				var form = $(this),
					data = {
						token: settings.token,
						secret: settings.secret,
						lead: {
							name: form.find('#name').val(),
							email: form.find('#email').val(),
							estado: form.find('#states').val(),
							nivel: form.find('#level').val()
						}
					};

				$.ajax({
					type: 'POST',
					url: '#',
					data: data,
					error: function () {
						showFeedback('error', 'Erro ao enviar formulário. Por favor, tente novamente.');
					},
					success: function () {
						console.log(data);s
						showFeedback('success', 'Formulário foi enviado com sucesso.');
					}
				});
			});
		};


		/**
		 * Shown a feedback popup according to the type.
		 * @param  {string} type    The CSS class to stylize.
		 * @param  {string} message Message that will be shown.
		 */
		var showFeedback = function (type, message) {
			alert(message);
		};


		/**
		 * Here we go! :)
		 */
		init();
	}

})(jQuery);
