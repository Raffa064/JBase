# JBase.js 
The JBase is a simple database that i chose as challenge for me. 
It basically have tables, and you can add and remove data from these tables, in the same way you can remove the tables.

# How to use
If you want to use in your project, yout wiil need to install only the JBase.js file, and import and instanciate the JBase class to your module:

```javascript
import JBase from ./JBase.js

var jb = new JBase()
```

After it you have to add your wanted table(s), using the **createTable** method with the table's name and an data template with the attributes of the table:

```javascript
jb.createTable('users', ['name', 'age', 'contry'])
//When you insert an user the user take an automatic id attribute.
```

Now you can insert and remove data on these table using the **insert**, and **remove** methods:

```javascript
jb.insert('users', ['Rafael', 14, 'Brasil']) //name, age and contry attributes of the new user
jb.remove('users', 'id = 0, name = Rafael') //remove the user with 1 id and with Rafael name, using an **query string**
```

After added, you can update and search any user on the database.
For search an user you can use the **query** method, with the table name and an [**query string**](#query-string) with the search arguments.

```javascript
jb.insert('users', ['Rafael', 14, 'Brasil']) //name, age and contry attributes of the new user
jb.query('users', 'name = Rafael, age > 10') //search for users with name Rafael and age grater than 10
```

```diff
- NOTE: the query returns an list of matched results of the query
```

If you want to chose an user attribute, you can use the **update** method:

```javascript
jb.update('users', 'name = Rafael', {age: 23}) //sets the age of all the users named Rafael to 23
```

```diff
- NOTE: the value argument need to be an object, and you only need to put your modified attributes inside her.
```
<a name="query-string"></a>
## **Query string**
The **query string** are basically a way to say what you want for the database.
It is used for insert, read, end delete specific data from the database.
The sintax of an **query string** is:
```python 
<attribute> <operator> <value> [,] ...
```
- The *attribute* is the name of the wanted attribute.
- The *operator* is what [comparation method](#comparation-methods) will be used as condition.
- The *value* is what you want to comparate with the attribute value.

```diif
+ NOTE: you can put more than one condition separated by comma.
```
<a name="comparation-methods"></a>
### Comparation methods <sub>Query string operators</sub>
