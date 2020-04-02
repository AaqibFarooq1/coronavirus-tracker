const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	$( document ).ready(function() {
		$('#data_total').text(arg.cases);
		$('#data_recovered').text(arg.recovered);
		$('#data_deaths').text(arg.deaths);
		$('#data_today').text(arg.todayCases);
		$('#refresh').click(function(){
			location.reload(true);
		})
		setInterval(function(){ location.reload(true); },15*60000);
	});
})
ipcRenderer.send('asynchronous-message', 'Total Cases fetched!')

