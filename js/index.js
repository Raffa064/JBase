import JBase from './JBase.js'
import JBaseTest from './test.js'

var jbTest = new JBaseTest()
var p = document.createElement('p')
document.body.appendChild(p)
p.setText = function(text) {
    this.innerHTML = text.replaceAll('\n', '<br>')
}
p.appendText = function(text) {
    this.innerHTML += text.replaceAll('\n', '<br>')
}
p.setText('Test result: '+jbTest.test())

var jb = new JBase()
var userTemplate = ['name', 'age', 'contry']
jb.createTable('users', userTemplate)
jb.insert('users', ['Rafael', 14, 'Brasil'])
jb.insert('users', ['Marcos', 34, 'Brasil'])
jb.insert('users', ['Rafael Marcos', 15, 'Brasil'])
var table = jb.getTable('users')
updateUserInterface(table.data)

var input = document.getElementById('queryInput')
input.onkeyup = queryUser

function queryUser() {
    if (input.value.trim() == '') {
        updateUserInterface(table.data)    
    } else {
        var results = jb.query('users', input.value)
        updateUserInterface(results)
    }
}

function updateUserInterface(data) {
    var databaseTable = document.getElementById('databaseTable')
    var html = '<table><tr id="table-title-bar"><td>id</td><td>name</td><td>age</td><td>contry</td></tr>'
    for (const d in data) {
        if (!data[d].id) continue
        html += '<tr>'
        html += '<td>'+data[d].id+'</td>'
        for (const a in table.template) {
            html += '<td>'+data[d][table.template[a]]+'</td>'  
        }
        html += '</tr>'
    }
    html += '</table>'
    databaseTable.innerHTML = html
}

