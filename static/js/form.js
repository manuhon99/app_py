//As chamadas no frontend, ou seja dos arquivos que ficam armazenados no dispositivo/celular do cliente, 
//para o acesso aos dados no backend, ou seja, aos arquivos que ficam armazenados no servidor/cloud do Heroku, 
//são feitas através das funções FETCH do JavaScript, que por sua vez executa as requisições HTTP que precisamos 
//para fazer o frontend conectar com o backend.
function saveForm() {
	var message = document.getElementById("feedbackmessageTextArea").value;
	var contact = document.getElementById("contactField").value;

	var url = "/saveForm?" 
				+ "contact=" + encodeURIComponent(contact)
				+ "&message=" + encodeURIComponent(message)
				+ "&userid=" + userid 
				+ "&latitude=" + latitude
        		+ "&longitude=" + longitude	

	fetch(url, {method: 'POST'})
		.then(function(response) {
			alert('Mensagem enviada com sucesso!');
			var itemid = response;
			listForm();
			showFormPage();
		});
}

function listForm() {
	var url = "/listForm?"
				+ "&userid=" + userid 
	fetch(url, {method: 'POST'}) 
		.then((resp) => resp.json())
		.then(function(respjson) {
			var list = "";
			for(var k in respjson) {
				var item = respjson[k];
				var date = "";
				if (item.timestamp != undefined && (item.timestamp != "")) {
					var date = new Date(item.timestamp.$date);
				}
				   list += "<hr>" + 
						   date + "<br/>" +
						   item.contact + "<br/>" + 
						   item.message;
			}
			document.getElementById("listFormDiv").innerHTML = list + "<hr>";
		});
}