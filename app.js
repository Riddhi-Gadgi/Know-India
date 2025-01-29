const states = document.querySelectorAll('.state');
const mainHeading = document.querySelector('.main-heading');
mainHeading.textContent = "Know India";
mainHeading.style.color = "#000";

const info = document.querySelector('.info');

const card = document.querySelector('.map');
const btline = document.querySelector('.bottom-line');
const back = document.querySelector('.back');

states.forEach(state => {
    let currClr = getComputedStyle(state).fill;
    state.style.fill = "rgb(211, 211, 211)";
    state.style.strokeWidth = "1.3px";
    state.style.stroke = "rgba(99, 99, 99, 0.76)";

    state.addEventListener("mouseover", () => {

        state.style.fill = currClr;
        mainHeading.textContent = state.getAttribute('title');
        mainHeading.style.color = currClr;

    });
    state.addEventListener("mouseout", () => {
        state.style.fill = "rgb(211, 211, 211)";
        // mainHeading.textContent = "Know India";
        // mainHeading.style.color = "#000";
    });

    let showCard = () => {
        states.forEach(state => {
            state.style.display = "none";
        })
        //Styling Card
        state.style.fill = currClr;
        card.style.height = "100%";
        card.style.width = "50%"
        card.style.backgroundColor = currClr;
        mainHeading.style.color = "#fff";
        btline.style.display = "none";
        back.style.display = "block";
        info.style.display = "block"
        console.log(state.getAttribute('title'));
        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${state.getAttribute('title')}`)
        .then(response => response.json())
        .then( data =>{
           info.textContent = data.extract;
           console.log(data.extract); 
           let prettyText = data.extract;
           console.log(prettyText.replaceAll('.','<br>'));
           info.textContent = prettyText;
        }) 
        .catch(e =>{
            console.log(e);
        })
    };
    state.addEventListener("click", showCard);

});
back.addEventListener("click",goBack);
function goBack() {
    console.log("back");
    window.location.href = "https://riddhi-gadgi.github.io/Know-India/";
}


