import JBase from './JBase.js'

export default class JBaseTest {
    test() {
        var jb = new JBase()
        console.log('test initialized')
        var sucess = 0
        var fails = 0
        jb.createTable('users', ['name', 'age'])
        if (jb.tables[0] && jb.tables[0].name === 'users') {
            sucess++
            console.log('CREATE TABLE: ok')
            jb.dropTable('users')
            if (!jb.tables[0]) {
                sucess++
                console.log('DROP TABLE: ok')
            } else {
                fails++
                console.log('DROP TABLE: error')
            }
        } else {
            fails++
            console.log('CREATE TABLE: error')
        }
        jb.createTable('users', ['name', 'age'])
        var usersTable = jb.getTable('users')
        if (usersTable && usersTable.name && usersTable.data) {
            sucess++
            console.log('GET TABLE: ok')
            jb.insert('users', ['Rafael', 14])
            jb.insert('users', ['Felipe', 35])
            jb.insert('users', ['Marcos', 54])
            jb.insert('users', ['Lucas', 12])
            jb.insert('users', ['Igor', 16])
            jb.insert('users', ['Vanda', 478])
            jb.insert('users', ['kusdufdg', 578])
            if (usersTable.data[0] && usersTable.data[0] && usersTable.data[0].id === 1) {
                sucess++
                console.log('INSERT: ok')
                var test3 = jb.remove('users', 'id = 1')
                var test0 = jb.remove('users', 'id != 1, name = Felipe')
                var test1 = jb.remove('users', 'id < 4')
                var test2 = jb.remove('users', 'id > 0, name = Lucas')
                var test4 = jb.remove('users', 'id <= 5')
                var test5 = jb.remove('users', 'id >= 6, age < 500')
                var test6 = jb.remove('users', 'id between 6-8')
                console.log(test0 + ' ' +test1 + ' ' +test2 + ' ' +test3 + ' ' +test4 + ' ' +test5 + ' ' +test6 + ' ')
                if (test0 === 1 & test1 === 1 & test2 === 1 & test3 === 1 & test4 === 1 & test5 === 1 & test6 === 1 & usersTable.data.length === 0) {
                    sucess++
                    console.log('REMOVE: ok')
                } else {
                    fails++
                    console.log('REMOVE: error')
                }
                jb.insert('users', ['Pizza', 300])
                if (jb.query('users', 'name = Pizza').length > 0) {
                    sucess++
                    console.log('QUERY: ok')
                    jb.update('users', 'name = Pizza', {age: 1})
                    if (jb.query('users', 'name = Pizza')[0].age === 1) {
                        sucess++
                        console.log('UPDATE: ok')
                    } else {
                        fails++
                        console.log('UPDATE: error')
                    }
                } else {
                    fails++
                    console.log('QUERY: error')
                }
            } else {
                fails++
                console.log('INSERT: error')
            }
        } else {
            fails++
            console.log('GET TABLE: error')
        }
        console.log('test finished')
        console.log('errors: '+fails+'/'+(sucess+fails))
        return fails+'/'+(sucess+fails)
    }
}
