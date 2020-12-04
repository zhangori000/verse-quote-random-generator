const container = document.getElementById('container');
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const gmailBtn = document.getElementById('gmail');
const newQuoteBtn = document.getElementById('new-quote');

const verseContainer = document.getElementById('verse-container');
const verseText = document.getElementById('verse');
const passage = document.getElementById('passage');
const gmailBtnBible = document.getElementById('gmail-verse');
const newVerseBtn = document.getElementById('new-verse');

const loader = document.getElementById('loader');


// //show loading *will add
// function loadingQuote() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }
// //hide loading 
// function completeQuote() {
//     if(!loader.hidden) {
//         quoteContainer.hidden = false;
//         loader.hidden = true;
//     }
// }


// Get Quote from API (worldly quote)
async function getQuote() {
    const proxyURL = 'https://thawing-brushlands-63746.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();

        //if author is blank, add unknown.
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font for long
        if(data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        
        quoteText.innerText = data.quoteText;
    } catch(error) {
       console.log('whoops, no quote');
    }
}



async function getVerse() {
    const proxyURL = 'https://thawing-brushlands-63746.herokuapp.com/'
    const apiURLBible = 'https://labs.bible.org/api/?passage=romans%201:-2:-3:-4:-5:-6:-7:-8:-9:-10:-11:-12:-13&type=json'
    try {
        const responseBible = await fetch(proxyURL + apiURLBible);
        const dataBible = await responseBible.json()
        
        //procedures for getting random verse in SINGLE chapter
        var size = dataBible.length;
        const randomVerseIdx = Math.floor(Math.random() * size);
        const randomVerse = dataBible[randomVerseIdx];
        console.log(size);
        console.log(randomVerseIdx);
        console.log(dataBible[randomVerseIdx]);
        
        //length check to change size if needed
        if(randomVerse.text.length > 100) {
            verseText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        verseText.innerText = dataBible[randomVerseIdx].text;
        passage.innerText = `${randomVerse.bookname} ${randomVerse.chapter}:${randomVerse.verse}`;
        
        
    } catch(error) {
        console.log('whoops, no quote', error);
    }
}



//copy and paste 
function copyText(text) {
    navigator.clipboard.writeText(text).then(function() {
        window.open("https://mail.google.com/mail/u/0/#inbox", '_blank');
      }, function() {
        alert('Error: copy and paste method did not work. Please copy manually')
      });
}
//email quote
function emailQuote() {
    var quote = quoteText.innerText;
    const author = authorText.innerText;
    copyText(quote + ' --- ' + author);
}
function emailVerse() {
    var verse = verseText.innerText;
    const passageText = passage.innerText;
    copyText(verse + ' --- ' + passageText);
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
newVerseBtn.addEventListener('click', getVerse);
gmailBtn.addEventListener('click', emailQuote);
gmailBtnBible.addEventListener('click', emailVerse);

getQuote();
getVerse();
