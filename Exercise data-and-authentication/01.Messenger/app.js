
const url = `http://localhost:3030/jsonstore/messenger`;
const meesages = document.getElementById('messages');

function attachEvents() {
    document.getElementById('submit').addEventListener('click', postMessages);
    document.getElementById('refresh').addEventListener('click', loadAllMessages);



}

async function postMessages(){

    const [author, content] = [document.getElementById('author'), document.getElementById('content')];
    if(author.value !== '' || content.value !== ''){
        await request(url,{author:author.value, contrnt:content.value});
// meesages += `${author.value}: ${content.value}`;
author.value = '';
content.value = '';
    }


}

async function loadAllMessages(){
    
const res = await fetch(url);
const data = await res.json();
meesages.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');



}

async function request(url, option){
if(option){

option = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(option)
};
const response = await fetch(url, option);

return response.json();
}
}

attachEvents();