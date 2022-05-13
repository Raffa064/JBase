export default class JBase {
    tables = []
    
    constructor() {
    }
    
    createTable(tableName, template) {
        var table = {
            name: tableName,
            template: template,
            data: [
            ]
        }
        table.data.CURRENT_ID = 0
        this.tables.push(table)
    }
    
    dropTable(tableName) {
        for (const t in this.tables) {
            var table = this.tables[t]
            if (table.name === tableName) {
                this.tables.splice(t)
                break;
            }
        }
    }
    
    getTable(tableName) {
        for (const t in this.tables) {
            var table = this.tables[t]
            if (table.name === tableName) {
                return table
            }
        }
    }
    
    insert(tableName, dataValue) {
        var table = this.getTable(tableName)
        if (table) {
            var array = dataValue
            dataValue = {}
            var index = 0
            for (const i in table.template) {
                dataValue[table.template[i]] = array[index]
                index++
            }
            dataValue.id = ++table.data.CURRENT_ID
            table.data.push(dataValue)
        }
    }
    
    remove(tableName, query) {
        var table = this.getTable(tableName)
        if (table) {
            var removeList = this.query(tableName, query)
            for (const item in removeList) {
                var index = table.data.indexOf(removeList[item])
                table.data.splice(index, 1)
            }
            return removeList.length
        }
    }
    
    queryComparator(comparator, a, b) {
        switch(comparator) {
            case '=':
                return a == b;
                break;
            case '!=':
                return a != b
                break
            case '<': 
                return parseInt(a) < parseInt(b)
                break
            case '>': 
                return parseInt(a) > parseInt(b)
                break
            case '<=': 
                return parseInt(a) <= parseInt(b)
                break
            case '>=': 
                return parseInt(a) >= parseInt(b)
                break
            case 'between': 
                var bSplitted = (''+b).split('-')
                var bb = bSplitted[1]
                var ba = bSplitted[0]
                return parseInt(a) > ba && parseInt(a) < bb
                break
        }
    }
    
    query(tableName, query) {
        var table = this.getTable(tableName)
        if (table) {
            var matchedResults = []
            var args = query.split(/\s*,\s*/)
            for (const d in table.data) {
                var dataValue = table.data[d]
                var result = true
                for (const a in args) {
                    var splittedArg = args[a].trim().split(/\s{1,}/)
                    var attr = splittedArg[0]
                    var comparator = splittedArg[1]
                    var value = splittedArg[2]
                    if (splittedArg.length > 3) {
                        for (let i = 3; i < splittedArg.length; i++) {
                            value += ' '+splittedArg[i]
                        }
                    }
                    var queryResult = this.queryComparator(comparator, dataValue[attr], value)
                    if (!dataValue[attr] || !queryResult) {
                        result = false
                        break
                    }
                }
                if (result) {
                    matchedResults.push(dataValue)
                }
            }
            return matchedResults
        }
    }
    
    update(tableName, query, value) {
        var queryiedData = this.query(tableName, query)
        for (const d in queryiedData) {
            for (const attr in value) {
                queryiedData[d][attr] = value[attr]
            }
        }
    }
}
