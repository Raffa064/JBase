import JBase from './JBase.js'
import JBaseTest from './test.js'

var jbTest = new JBaseTest()
var p = document.getElementById('testResult')
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
jb.insert('users', ['Fulano', 15, 'Brasil'])
jb.insert('users', ['Beutrano', 34, 'Estados Unidos'])
jb.insert('users', ['Ciclano', 45, 'China'])
jb.insert('users', ['Caboco', 23, 'Brasil'])
jb.insert('users', ['Cara', 46, 'Brasil'])
jb.insert('users', ['Pessoinha', 16, 'Africa'])
jb.insert('users', ['Caboquin', 67, 'Africa'])
jb.insert('users', ['Mano', 34, 'China'])
jb.insert('users', ['Brother', 12, 'Estados Unidos'])
jb.insert('users', ['Jabiraca', 45, 'China'])
jb.insert('users', ['Moço', 15, 'Brasil'])
jb.insert('users', ['Moça', 55, 'Brasil'])
jb.insert('users', ['Fulana', 67, 'Inglaterra'])
jb.insert('users', ['Fulana da Silva', 13, 'Japão'])
jb.insert('users', ['Fadimi putinho', 45, 'Russia'])
jb.insert('users', ['Senhora', 80, 'Russia'])
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

