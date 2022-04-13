/*
                                                                                        :Nota per il Professore:

Al posto di dover ogni volta "comporre" il nome della griglia che ho selezionato, per identificarla
(modifica fatta nell'HTML, dove ho diviso la "grande" griglia in 3 piccole sotto-griglie da 9 box)
avrei potuto utilizzare il "data-question-id" per identificare l'immagine cliccata, senza dover ogni volta
comporre il nome della griglia.

*/ 


let img_sel_1;
let img_sel_2;
let img_sel_3;

//------------------------------------------------------------------------------------------------------------------------------------------------

function uncheckToCheck(event){

    //Come capire quale griglia ho cliccato?

    let numeroDaPassare; //Numero di Griglia Cliccata

    //console.log("Event in uncheckToCheck:", event);
    //console.log("ARRAY -> Event.path:", event.path[4]);

    let IndiceArray = event.path[4];

    //console.log("NOME GRIGLIA CLICCATA ---> ", IndiceArray.classList.value);

    if(IndiceArray.classList.value === "choice-grid-1"){

        //Se abbiamo cliccato sulla GRIGLIA 1 passerà il valore ---> 1
        numeroDaPassare = 1;

    }else if(IndiceArray.classList.value === "choice-grid-2"){

        //Se abbiamo cliccato sulla GRIGLIA 2 passerà il valore ---> 2
        numeroDaPassare = 2;

    }else{

        //Se abbiamo cliccato sulla GRIGLIA 2 passerà il valore ---> 3
        numeroDaPassare = 3;

    }

    //console.log("quindi il Numero da passare per comporre il nomeGriglia e':", numeroDaPassare);

    imgSelezionate(event.currentTarget, numeroDaPassare);

}

//------------------------------------------------------------------------------------------------------------------------------------------------

function imgSelezionate(identifier, number){

    let nomeGriglia ="choice-grid-" +number; //Compongo il Nome della Griglia.

    console.log("nomeGriglia composto -->", nomeGriglia); //Stampiamo valore di nomeGriglia per vedere se corrisponde con 
                                                          //quella effettivamente cliccata

    let actual_id = identifier;
        
        const lista = document.querySelectorAll("."+nomeGriglia+" .img-cb");

        //console.log(lista); -> Lista degli elementi presenti nella specifica griglia

        //Mettiamo TUTTI GLI ELEMENTI DELLA GRIGLIA come NON CLICCATI
        for (const elementi of lista){

            elementi.classList.add("_unselected");
            //console.log("Elementi ---> ", elementi.childNodes[5]);

            //se avevamo già selezionato qualcosa, lo "togliamo"
            if(elementi.classList.value === "img-cb _selected _unselected"){

                elementi.classList.remove("_selected");
                elementi.childNodes[5].src = "images/unchecked.png";
    
            }

        }

        actual_id.classList.remove("_unselected"); //Per l'immagine effettivamente cliccata
                                                   //togliamo l'unselected
        actual_id.classList.add("_selected"); //Eh la consideriamo come selected

        //console.log("Choice_ID: ", actual_id.parentNode.dataset.choiceId); //ChoiceID
        let checkbox = actual_id.childNodes[5];
        checkbox.src = "images/checked.png";

        //Capire quale messaggio dobbiamo far stampare alla fine
        if(number == 1){

            img_sel_1 = actual_id.parentNode.dataset.choiceId
            console.log("Choice ID Griglia 1 --->", img_sel_1);


        }else if (number == 2){

            img_sel_2 = actual_id.parentNode.dataset.choiceId
            console.log("Choice ID Griglia 2 --->", img_sel_2);

        }else{

            img_sel_3 = actual_id.parentNode.dataset.choiceId
            console.log("Choice ID Griglia 3 --->", img_sel_3);

        }

        console.log("img_sel_1 ---> ", img_sel_1);
        console.log("img_sel_2 ---> ", img_sel_2);
        console.log("img_sel_3 ---> ", img_sel_3);

        //Se sono TUTTI UGUALI o TUTTI DIVERSI manda comunque Titolo e Testo della 1' Immagine cliccata

        if((img_sel_1 !== img_sel_2 && img_sel_1 !== img_sel_3 && img_sel_2 !== img_sel_3) || 
           (img_sel_1 === img_sel_2 && img_sel_1 === img_sel_3 && img_sel_2 === img_sel_3)){

            scorriLista(img_sel_1);


        //Se 1' Immagine = 2' Immagine O 1' Immagine = 3' Immagine manda Titolo e Testo della 1' Immagine cliccata

        }else if(img_sel_1 === img_sel_2 || img_sel_1 === img_sel_3){

            scorriLista(img_sel_1);


        //Se 2' Immagine = 3' Immagine manda Titolo e Testo della 2' Immagine cliccata

        }else if(img_sel_2 === img_sel_3){

            scorriLista(img_sel_2);

        }

}

//------------------------------------------------------------------------------------------------------------------------------------------------

function scorriLista(id_immagine){ //Funzione di Supporto alla funzione "imgSelezionate()"

    for(let id_result in RESULTS_MAP){

        if(id_result === id_immagine){

            console.log("Identificativo del Testo che stiamo facendo stampare---> ", id_result);
            let testo = RESULTS_MAP[id_immagine];
            
            creaP(testo.title, testo.contents);

        }

    }

}

//------------------------------------------------------------------------------------------------------------------------------------------------

function creaP(titolo, contenuto){

    /*console.log("Dentro creaP");
    
    console.log("Testo.title -> ", titolo);
    console.log("Testo.title -> ", contenuto);*/

    if(img_sel_1 && img_sel_2 && img_sel_3 )
    {

        const boxes = document.querySelectorAll(".choice-grid-1 .img-cb, .choice-grid-2 .img-cb, .choice-grid-3 .img-cb");
                                        
        console.log(boxes);
        
        for (const box of boxes){
        
            //box.classList.add("choice-grid_unselected");
            box.removeEventListener("click", uncheckToCheck);
            
        }

        const div_risultato = document.querySelector("#risultato"); //ci riferiamo al DIV hidden

        const new_h1 = document.createElement("h1"); //Creiamo l'h1
        new_h1.textContent = titolo;
        div_risultato.appendChild(new_h1);
    
        const new_p = document.createElement("p"); //Creiamo il 'p'
        new_p.textContent = contenuto;
        div_risultato.appendChild(new_p);
    
        const new_button = document.createElement("button");
        new_button.innerHTML = "Ricomincia Quiz";
        div_risultato.appendChild(new_button);

        new_button.addEventListener("click", reset);

    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------

function reset(){

    const boxes = document.querySelectorAll(".choice-grid-1 .img-cb, .choice-grid-2 .img-cb, .choice-grid-3 .img-cb");
                                        
    console.log(boxes);
    
    for (const box of boxes){
    
        box.addEventListener("click", uncheckToCheck);
        
        if(box.className === "img-cb _unselected")
        {

            box.classList.remove("_unselected");

        }else{

            box.classList.remove("_selected");
            let checkbox = box.childNodes[5];
            checkbox.src = "images/unchecked.png";

        }
    }

    img_sel_1 = null;
    img_sel_2 = null;
    img_sel_3 = null;

    const div_risultato = document.querySelector("#risultato");
    div_risultato.innerHTML=' ';

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

}

//Fine funzioni

//Inizio del lato interattivo JavaScript

const boxes = document.querySelectorAll(".choice-grid-1 .img-cb, .choice-grid-2 .img-cb, .choice-grid-3 .img-cb");
                                        
//console.log(boxes);

for (const box of boxes){

    box.addEventListener("click", uncheckToCheck);    

}

