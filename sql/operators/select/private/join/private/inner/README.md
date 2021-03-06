# inner Helper
Specifies the `INNER JOIN` operator for the `FROM` clause.

#### Supported by
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/select.html)
- [MariaDB](https://mariadb.com/kb/en/library/select/)
- [PostgreSQL](https://www.postgresql.org/docs/9.5/static/sql-select.html)
- [SQLite](https://sqlite.org/lang_select.html)
- [Oracle](https://docs.oracle.com/cd/B19306_01/server.102/b14200/statements_10002.htm)
- [SQLServer](https://docs.microsoft.com/en-us/sql/t-sql/queries/from-transact-sql)

# Allowed Types and Usage

## as String:

Usage of `inner` as **String** with the following Syntax:

**Syntax:**

```javascript
$inner: < String >
```

**SQL-Definition:**
```javascript
<key-ident> AS <value-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                people_skills: {
                    $inner: 'skills',
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    INNER JOIN people_skills AS skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $1

// Values
{
    "$1": 50
}
```

## as Object:

Usage of `inner` as **Object** with the following Syntax:

**Syntax:**

```javascript
$inner: { ... }
```

**SQL-Definition:**
```javascript
<value> AS <identifier>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $inner: {
                        $select: {
                            $from: 'people_skills',
                            $where: {
                                is_skill: 1
                            }
                        }
                    },
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    INNER JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) AS skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

## as Function:

Usage of `inner` as **Function** with the following Syntax:

**Syntax:**

```javascript
$inner: sql.<callee>([params])
```

**SQL-Definition:**
```javascript
<value> AS <key-ident>
```

:bulb: **Example:**
```javascript
function() {
    return sql.build({
        $select: {
            $columns: {
                'people.first_name': true,
                'people.last_name': true,
                'skills.description': true,
                'skills.rate': true
            },
            $from: 'people',
            $join: {
                skills: {
                    $inner: sql.select('*', {
                        $from: 'people_skills',
                        $where: {
                            is_skill: 1
                        }
                    }),
                    $on: {
                        'skills.people_id': { $eq: '~~people.people_id' }
                    }
                }
            },
            $where: {
                'skills.rate': { $gt: 50 }
            }

        }
    });
}

// SQL output
SELECT
    people.first_name,
    people.last_name,
    skills.description,
    skills.rate
FROM
    people
    INNER JOIN (
        SELECT
            *
        FROM
            people_skills
        WHERE
            is_skill = $1
    ) AS skills ON skills.people_id = people.people_id
WHERE
    skills.rate > $2

// Values
{
    "$1": 1,
    "$2": 50
}
```

