$(document).ready(function(){

	var znak_user = 'O';
	var znak_comp = 'X';
	var reset = document.getElementById("reset-game");//новая игра
	var rand_num  = Math.round((Math.random() * (9-1) + 1));
		if(rand_num > 3){
			var znak_comp = 'O';
			var znak_user = 'X';
			$('.result2').text("X");
			$('.result2').css("color","#A6CE28");
			$('.data-ceil'+rand_num).text(znak_comp);
			znakColor()
		}else{

		$('.result2').text("O");
		$('.result2').css("color","#F6B404");
		}

	var exit_flag=false;
	var step_count = 0;
	var win_user_array = ['123','456','789','147','258','369','159','357'];

	//ОПРЕДЕЛЯЕТ ЦВЕТ ФИГУРЫ
	function znakColor(){
		for(var i = 1; i <= 10; i++){
			if($('.data-ceil'+i).text() == 'O'){
				$('.data-ceil'+i).css("color","#F6B404");
			}
			if($('.data-ceil'+i).text() == 'X'){
				$('.data-ceil'+i).css("color","#A6CE28");
			}
		}
	}
	

	//определяем победу игрока
	function check_3_user(znak){
		for(var i=0; i<8; i++){
			var first  = 'data-ceil'+win_user_array[i].substr(0,1);//во первых
			var second = 'data-ceil'+win_user_array[i].substr(1,1);//во вторых
			var third  = 'data-ceil'+win_user_array[i].substr(2,1);//в третьих

			if($('.'+first).text() == znak 
				&& $('.'+second).text() == znak 
				&& $('.'+third).text() == znak){

				$('.'+first+',.'+second+',.'+third).css("background-color","#464646");
				znakColor()
				$('.result').text('Вы выиграли!');
				$('.result2').text("");
				$('.ceils #ceil').unbind('click');
				exit_flag = true;
			}
		}
	}


	//определяем возможость победы компьютера
	function check_2_comp(znak){
		for(var i = 0; i<8; i++){
			var first  = 'data-ceil'+win_user_array[i].substr(0,1);
			var second = 'data-ceil'+win_user_array[i].substr(1,1);
			var third  = 'data-ceil'+win_user_array[i].substr(2,1);

			if($('.'+first).text() == znak
				&& $('.'+second).text() == znak
				&& $('.'+third).text() == "" && exit_flag == false){

				$('.'+third).text(znak);
				znakColor()
				$('.'+first+',.'+second+',.'+third).css("background-color","#464646");
				$('.result').text('Вы проиграли');
				$('.result2').text("");
				$('.ceils #ceil').unbind('click');
				exit_flag = true;
			}

			if($('.'+first).text() == znak 
				&& $('.'+second).text() ==''
				&& $('.'+second).text() ==znak && exit_flag == false){

				$('.'+second).text(znak);
				znakColor()
				$('.'+first+',.'+second+',.'+third).css("background-color","#464646");
				$('.result').text('Вы проиграли!');
				$('.result2').text("");
				$('.ceils #ceil').unbind('click');
				exit_flag = true;
			}

			if($('.'+first).text()==''
				&& $('.'+second).text()==znak
				&& $('.'+third).text()==znak
				&& exit_flag == false){

				$('.'+first).text(znak);
				znakColor()
				$('.'+first+',.'+second+',.'+third).css("background-color","#464646");
				$('.result').text('Вы проиграли!');
				$('.result2').text("");
				$('.ceils #ceil').unbind('click');
				exit_flag = true;
			}
		}
	}

	//определяем ход компьютера
	function check_2_user(znak){
		for(var i=0; i<8; i++){
			var first  = 'data-ceil'+win_user_array[i].substr(0,1);
			var second = 'data-ceil'+win_user_array[i].substr(1,1);
			var third  = 'data-ceil'+win_user_array[i].substr(2,1);

			if(exit_flag == false){
				if($('.'+first).text() == znak
					&& $('.'+second).text() == znak
					&& $('.'+third).text() == ''){

					$('.'+third).text(znak_comp);
					znakColor()
					exit_flag = true;
				}
			}

			if(exit_flag == false){
				if($('.'+first).text() == znak &&
				   $('.'+second).text() == '' &&
				   $('.'+third).text() == znak){

					$('.'+second).text(znak_comp);
					znakColor()
					exit_flag = true;
				}
			}
			if($('.'+first).text() == '' &&
				$('.'+second).text() == znak &&
				$('.'+third).text() == znak){

				$('.'+first).text(znak_comp);
				znakColor()
				exit_flag = true;
			}
			if(exit_flag) break;
		}
	}


	
	$('.ceils #ceil').click(function(){
		//если клетка пустая
		if($(this).text() == ''){
			$(this).text(znak_user);
			znakColor()
			check_3_user(znak_user);
			check_2_comp(znak_comp);
			check_3_user(znak_user);
			if(exit_flag == false){
				for(var i=1; i<10; i++){
					if($('.data-ceil'+i).text() == ''){
						$('.data-ceil'+i).text(znak_comp);
						znakColor()
						break;
					}
				}
			}else exit_flag = false;
		}
	});
});