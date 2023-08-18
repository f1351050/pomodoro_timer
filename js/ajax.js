
function ajaxCon(category,hizuke,start,end){
		var data={category:category,hizuke:hizuke,start:start,end:end};
		$.ajax({
			type:"POST",
			url: "php/pdo.php",
			data: data,
			}).done(function(data){
				$('#res').html(data);
				
			}).fail(function(){
				alert('通信エラー');			
		    });
		    return false;
};