const quoteContainer=document.getElementById('quote-container');
const quotetext=document.getElementById('quote');
const authortext=document.getElementById('author');
const twitterbtn=document.getElementById('twitter');
const newquotebtn=document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
// get quote form api

async function getquote(){
    loading();
    const proxyUrl='https://whispering-tor-04671.herokuapp.com/'
    const apiUrl ="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json   ";
    try{
        const response = await fetch(proxyUrl+apiUrl);
        const data= await response.json();
        // if author is blank print unknown
        if(data.quoteAuthor===''){
            authorText.innerText='unknown';
        }
        else{
            authortext.innerText=data.quoteAuthor;
        }
        
        quotetext.innerText=data.quoteText;

        complete();
    } catch(error){
        getquote();
    }
}
// twitter quote
function tweetquote(){
    const quote=quoteText.innerText;
    const author=authorText.innerText;
    const twitterurl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterurl,'_blank');

}
// event listener
newquotebtn.addEventListener('click',getquote);
twitterbtn.addEventListener('click',tweetquote);

// on load
getquote();