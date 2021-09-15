

console.log('Client side javascript file is loaded!');


fetch('/weather?address=didwana').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})



const weatherForm = document.querySelector('form');

const search = document.querySelector('input');

const submit = document.querySelector('button');

const msgOne = document.querySelector('#msg-1');

msgOne.textContent = 'From JavaScript'




weatherForm.addEventListener('click', (event) => {
    event.preventDefault();
    
    submit.addEventListener('click', () => {
        const location = search.value;
        const msgSecond = document.querySelector('#msg-2');
        msgSecond.textContent = 'Loading...'

        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                console.log(data);
                msgOne.textContent = location;
                msgSecond.textContent =data.data;
            })
        })
    })
    console.log();
})