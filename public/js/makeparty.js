$(document).ready(function () {
	$('#submitBtn1').click(function () {
		console.log(123);
		var partyName = $('#partyName').val();
		var streetAddr = $('#streetAddr').val();
		var zipCode = $('#zipCode').val();
		var date = $('#date').val();
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();
		var data = {
			partyName: partyName,
			streetAddr: streetAddr,
			zipCode: zipCode,
			date: date,
			startTime: startTime,
			endTime:endTime
		};
		$.ajax({
			url: '/makeParty',
			type: 'post',
			data:JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json',
			success:function(succMessage){

			},
			error:function(errMessage){

			}
		});
	});
});