//Função que irá selecionar a div busca e bloquear o evento 
// evento padrão de envio do formulário 
//Detalha para async() - A função tornasse assíncrona
document.querySelector('.busca').addEventListener('submit', async(e)=>{
    e.preventDefault(); //Função para bloquear função padrão de formulário 

    var input = document.querySelector('#searchInput').value; //Armazena o valor inserido no form

    if(input !==''){ //Se o input for diferente de branco, irá executar a função showWarning
        clearInfo();
        showWarning('Carregando...');

        //Importante -- Aqui será linkada as informações do site. 
        //Utilizar a função encode para encripitar a input e linkar a chave da api do site.
        //Utilizar os parâmetros de units - &units=metric
        //Utilizar os parâmetros de linguagem - &lang=pt_br
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=db8ae1906fb09c82dde62c7e768a0fb0&units=metric&lang=pt_br`;
        
        let results = await fetch(url); //Função assincrona - Função faz a requisição e aguarda o resultado
        let json = await results.json(); //results.json - Pega o resultado e transforma em json()
    
        if(json.cod === 200){ //200 é o código o qual afirma que a busca foi bem sucedida
            showInfo({
                //Declaração de variáveis com cada item conforme json do site
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                tempDesc: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else{
            clearInfo(); //Tira as informações
            showWarning('Não encontramos esta localização.');
        }
    } else{
        clearInfo();
    }
     

});

function showInfo(json){
    showWarning(''); //Retira a mensagem posterior
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`; //Pega o nome da cidade e o país
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`; //Pega a temperatura
    document.querySelector(`.ventoInfo`).innerHTML = `${json.windSpeed} <span>km/h</span>`; //Pega a velocidade do vento

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); //A foto da temperatura(nuvem, sol, chuva) é trocada de acordo com a info do site

    document.querySelector('.tempDesc').innerHTML = `${json.tempDesc}`; //Adição própria de descrição do clima***

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`; //Direção do vento

    document.querySelector('.degDesc').innerHTML = `${json.windAngle}<sup>°</sup>`; //Adição própria de descrição dos graus do vento***

    document.querySelector('.resultado').style.display = 'block'; //Mostra a div resultado alterando de display.none para display.block
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg){ //Irá mostrar mensagem na tela com o aviso na div .aviso
    document.querySelector('.aviso').innerHTML = msg;
}