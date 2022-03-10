import './App.css';
import mujer from './assets/personaje/Female.webp'
import hombre from './assets/personaje/Male.webp'

const questions_json = require('./assets/questions/questions.json');
let current = hombre;
let start = false;
let vidas = 3;
let numb_question = 0;
let puntos = 0;
let total = Object.keys(questions_json).length; 

// shuffle questions
let random_keys = Array(total).fill().map((_, i) => i + 1).sort(() => .5 - Math.random());

function App() {

  console.log(random_keys);

  function changeImage() {
    // Funcion para cambiar personaje

    if (current === hombre) {

      current = mujer;

    }else{
      current = hombre;
    }

    document.getElementById("personaje").src = current;

    document.getElementById("ing").src = current;

    document.getElementById("personaje_final").src = current;

    document.getElementById("personaje_perdio").src = current;

  }

  function jugar(){
    // Funcion para iniciar el juego o mostrar el menu

    if(start === false){

      showGame();

    }else{

      showMenu();
      restart();
    }
  }

  function showGame(){
    // Funcion para mostrar el div game y questions

    document.getElementById("menu").style.display = 'none';
    document.getElementById("game").style.display = 'block';
    document.getElementById("questions").style.display = 'block';
    document.getElementById("win").style.display = 'none';

    start = true;
    showQuestion(numb_question);
    document.getElementById("vidas").innerHTML = (`<span> &#10084; </span>`).repeat(vidas);

  }

  function showMenu(){
    // Funcion para mostrar el div menu

    document.getElementById("menu").style.display = 'block';
    document.getElementById("gameover").style.display = 'none';
    document.getElementById("game").style.display = 'none';
    document.getElementById("questions").style.display = 'none';
    document.getElementById("win").style.display = 'none';

    restart();

  }

  function showGameover(){
    // Funcion para mostrar el div gameover

    let puntaje_div = document.getElementById("puntaje_over");

    let puntaje_text = document.createElement("h2");
    
    puntaje_text.innerHTML = `Tu putuacion es de: ${puntos} puntos`;

    puntaje_div.appendChild(puntaje_text);

    puntaje_div.appendChild(puntaje_text);

    document.getElementById("game").style.display = 'none';
    document.getElementById("questions").style.display = 'none';
    document.getElementById("win").style.display = 'none';
    document.getElementById("gameover").style.display = 'block';

  }

  function showWin(){
    // Funcion para mostrar el div win si es que se gana

    let puntaje_div = document.getElementById("puntaje_win");

    let boton_win = document.getElementById("boton_win");

    let puntaje_text = document.createElement("h2");

    let button = document.createElement("button");

    puntaje_text.innerHTML = `Tu putuacion es de: ${puntos} puntos`;

    puntaje_div.appendChild(puntaje_text);

    document.getElementById("game").style.display = 'none';
    document.getElementById("questions").style.display = 'none';
    document.getElementById("win").style.display = 'block';
    document.getElementById("gameover").style.display = 'none';

    festejo();

    button.innerHTML = "Ir al menu";
    button.className = "menu_button";
    button.onclick = showMenu;

    boton_win.appendChild(button);

  }

  function restart(){
    // Funcion para reiniciar las variables del juego

    start = false;
    numb_question = 1;
    vidas = 3;
    puntos = 0;

    let puntaje_div_win = document.getElementById("puntaje_win");
    let puntaje_div_over = document.getElementById("puntaje_over");


    let boton_win = document.getElementById("boton_win");

    puntaje_div_win.innerHTML = '';
    puntaje_div_over.innerHTML = '';
    boton_win.innerHTML = '';
  }

  function jump(){ 
    // Funcion para saltar al siguiente pregunta

    let ing = document.getElementById("ing")

    if (ing.classList !== "jump"){
        
      ing.classList.add("jump");

      setTimeout(function(){

        ing.classList.remove("jump");

      }, 500);
    }
  
  }

  function prefestejo(){ 
    // Funcion para hacer animacion antes del div win

    let personaje = document.getElementById("ing")

    document.getElementById("questions").style.display = 'none';

    if (personaje.classList !== "prefestejo"){
        
        personaje.classList.add("prefestejo");

        setTimeout(function(){

          personaje.classList.remove("prefestejo");

          showWin();

        }, 1000);

    }
  }

  function festejo(){ 
    // Funcion para hacer animacion durante div win

    let personaje = document.getElementById("personaje_final")

    if (personaje.classList !== "festejo"){
        
        personaje.classList.add("festejo");

        setTimeout(function(){

          personaje.classList.remove("festejo");

        }, 1500);
    }
  
  }

  function fall(){
    // Funcion para hacer animacion de caida al morir
      
      let ing = document.getElementById("ing")
  
      if (ing.classList !== "fall"){
          
        ing.classList.add("fall");

        setTimeout(function(){

          ing.classList.remove("fall");
        
        }, 500);
      }
  
  }

  function submit(index, key){
    // Funcion para validar respuesta

    let question_key = random_keys[index]

    let current_question = questions_json[question_key];

    let correct_answer = current_question.answer;

    if (correct_answer !== key){
      
      if (vidas > 1){
        vidas--;
        
        document.getElementById("vidas").innerHTML = (`<span> &#10084; </span>`).repeat(vidas);
        
        fall();

      }else{
        fall();
        
        showGameover();

      }
    }else{

      puntos = puntos + 1;
      
      jump();

    }

    numb_question++;

    if (numb_question < Object.keys(questions_json).length){
      
      showQuestion(numb_question);

    }else{
      
      prefestejo();

    }

  }

  function showQuestion(index){
    // Funcion para mostrar la pregunta

    let question_key = random_keys[index]

    let question_text = document.getElementById("question_text");
    let question_options = document.getElementById("question_options");

    let pgbar = document.getElementById("progressBar");

    pgbar.value = numb_question
    question_text.innerHTML = "";
    question_options.innerHTML = "";
    
    let current_question = questions_json[question_key];

    let num_quest = index + 1

    let que_tag = '<h3>'+ num_quest + ". " + current_question.question +'</h3>';

    question_text.innerHTML = que_tag;

    for (let key in current_question.answers){

      let ans = current_question.answers[key]
      let radio = document.createElement("input");
      let row = document.createElement("div");
      let label = document.createElement("label");

      row.setAttribute("class", "row");

      question_options.appendChild(row);

      radio.setAttribute("type", "radio");
      radio.setAttribute("name", "option");
      radio.setAttribute("class", "radio");
      radio.setAttribute("id", key);
      radio.setAttribute("value", key);

      row.appendChild(radio);

      label.setAttribute("class", "option");
      label.setAttribute("for", key);
      label.innerHTML = ans
      row.appendChild(label);

      radio.addEventListener("click", submit.bind(null, index, key));

    }
  }

  return (

    <div className="App">

      <div className="menu" id="menu">
        
        <div>

          <h1>Engineer's road game</h1>

          <h2>Selecciona tu personaje</h2>

          <img className="personaje" id="personaje" src={current} alt="img del personaje"></img>
          
          <button className="menu_button" id="arrows" onClick={changeImage}> </button>

          <button className="menu_button" onClick={jugar}> Jugar </button>

        </div>
      
      </div>

      <div className="game" id="game">

        <button className="menu_button" id="back" onClick={jugar}> Menu </button>
        
        <img className="personaje" id="ing" src={current} alt="img del personaje"></img>

      </div>

      <div className='gameover' id = "gameover">

        <h1>Perdiste</h1>

        <div id="puntaje_over"></div>

        <img className="personaje" id="personaje_perdio" src={current} alt="img del personaje"></img>

        <button className="menu_button" onClick={showMenu}> Volver al menu </button>
      
      </div>

      <div className='win' id="win">

        <h1>Ganaste! felicidades</h1>

        <div id="puntaje_win"></div>
        
        <img className="personaje" id="personaje_final" src={current} alt="img del personaje"></img>

        <div id="boton_win"></div>
      </div>

      <div className="questions" id="questions">

        <div id="vidas"></div>

        <div id="question_text"></div>

        <div id ="question_options"></div>

        <div id = "question_timer">

          <progress id="progressBar" value="0" max = {total}></progress>

        </div>

      </div>

    </div>
  );

}

export default App;
