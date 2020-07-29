$(function () {

	//JSON取得
	$.ajax({
		type: "get",
		url: "/egg_allergy/json/list.json",
		dataType: "json"
	})
	.done((data) => {

		var table = document.createElement('table');
		var thead = document.createElement("thead");
		var tbody = document.createElement('tbody');
		for (var i = 0; i < data.length; i++) {
			var tr = document.createElement('tr');
			if(i === 0) {
				for (var j = 0; j < Object.keys(data[i]).length; j++) {
					var th = document.createElement('th');
					var key = Object.keys(data[i])[j];
					th.textContent = data[i][key];
					tr.appendChild(th);
				}
				thead.appendChild(tr);
			} else {
				for (var j = 0; j < Object.keys(data[i]).length; j++) {
					var td = document.createElement('td');
					var key = Object.keys(data[i])[j];
					td.textContent = data[i][key];
					tr.appendChild(td);
				}
				tbody.appendChild(tr);
			}
		}
		table.appendChild(thead);
		table.appendChild(tbody);
		document.getElementById('table').appendChild(table);
	})
	.fail((data) => {
		console.log('JSON取得に失敗しました');
	});

	//ソート機能
	setTimeout(function(){
		$('#table table').tablesorter();
	},500);
	
	// リアルタイム検索
	$('#search-text').on('input', function(){

		var searchText = $(this).val().split(/,|、|\s/g);
		var targetText;
		var check = new Array();
		console.log(searchText);

		$('#table tbody tr').each(function() {
			targetText = $(this).find('td').text();
			console.log(targetText);

			//キーワード数分岐
			if(searchText.length === 1) {
				if (targetText.indexOf(searchText) != -1) {
					$(this).removeClass('hidden');
				} else {
					$(this).addClass('hidden');
				}
			} else {
				for(var i = 0; i < searchText.length; i++) {
					if (targetText.indexOf(searchText[i]) != -1) {
						check[i] = 'true';
					} else {
						check[i] = 'false';
					}
				}
				if (check.indexOf('false') != -1) {
					$(this).addClass('hidden');
				} else {
					$(this).removeClass('hidden');
				}
			}
		});
	});

});