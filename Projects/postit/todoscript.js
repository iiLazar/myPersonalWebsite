var notes = '';
var i = 0;
var iString = localStorage.getItem('postitsI');
i = JSON.parse(iString);
if (typeof (Storage) !== 'undefined') {
    document.getElementById('notes').innerHTML = 'Unfortunately your browser does not have the capacity to store notes for you next session';
}
var noteStr = localStorage.getItem('postits');
notes = JSON.parse(noteStr);
if (notes === null) {
    notes = '';
}
document.getElementById("notes").innerHTML = notes;
    
function creator() {
    i++;
    var txt = document.getElementById('text').value;
    var note = `<div class="note" id="note${i}"><button class="edit" onclick="editor('tudu${i}')" title="Edit this note">edit</button><button class="delete" onclick="eraser('note${i}')" title="Delete this note">${'&times;'}</button><span id="tudu${i}">${txt}</span></div>`;
    notes += note;
    document.getElementById('notes').innerHTML = notes;
    saveNotes();
    iSave();
    textAreaDefaultText();
    showElement('delBtn');
}
    
function eraser(a) {
    document.getElementById(a).outerHTML = '';
    notes = document.getElementById('notes').innerHTML;
    saveNotes();
}

function editor(t) {
    document.getElementById('text').style.backgroundColor = 'pink';
    hideElement('createBtn');
    showElement('editBtn');
    document.getElementById('text').value = document.getElementById(t).innerHTML;
    document.addEventListener("keydown", function(k) {
        if (k.which === 27) {
            textAreaDefaultColor();
            textAreaDefaultText();
            hideElement('editBtn');
            showElement('createBtn');
        }
    })
    document.getElementById('editBtn').onclick = overwrite;

    function overwrite() {
        document.getElementById(t).innerHTML = document.getElementById('text').value;
        notes = document.getElementById('notes').innerHTML;
        saveNotes();
        textAreaDefaultColor();
        textAreaDefaultText()
        hideElement('editBtn');
        showElement('createBtn');
    }
}
function modalDel() {
    showElement('modal');
    hideElement('editBtn');
    showElement('createBtn');
    textAreaDefaultColor();
    textAreaDefaultText();
}

function deleteAll() {
    notes = '';
    document.getElementById('notes').innerHTML = notes;
    saveNotes();
    i = 0;
    iSave();
    hideElement('delBtn');
    hideElement('modal');
}

function showElement(el) {
    document.getElementById(el).style.display = 'block';
}

function hideElement(el) {
    document.getElementById(el).style.display = 'none';
}

function textAreaDefaultText() {
    document.getElementById('text').value = `Your note...? -- note${i+1}`; //i+1 to have insihgt in script workings
}

function textAreaDefaultColor() {
    document.getElementById('text').style.backgroundColor = '#c2d1f0';
}

function saveNotes() {
    noteStr = JSON.stringify(notes);
    localStorage.setItem('postits', noteStr);
}

function iSave() {
    iString = JSON.stringify(i);
    localStorage.setItem('postitsI', iString);
}

if (notes === '') {
    hideElement('delBtn');
} else {
    showElement('delBtn');
}

document.getElementsByClassName('close')[0].onclick = hideElement('modal');
window.onclick = function(k) {
    if (k.target == document.getElementById('modal')) {
        hideElement('modal');
    }
}
document.addEventListener("keydown", function(k) {
    if (k.which === 27) {
        hideElement('modal');
    }
})