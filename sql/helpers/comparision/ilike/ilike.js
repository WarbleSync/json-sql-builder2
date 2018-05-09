'use strict';

class ilike extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('ILIKE <value-param>', SQLBuilder.CALLEE) }
		});
	}
}

module.exports = {
	definition: ilike,
	description: 'Specifies the comparision `ILIKE` Operator as Helper.',
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-matching.html'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: { $ilike: 'J___n%' }
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name LIKE $1',
						values: {
							$1: 'J___n%'
						}
					}
				}
			},
			"Usage as SQL-Function": function(sql){
				return {
					test: function(){
						let averageAge = 45;

						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									first_name: sql.ilike('J___n%')
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name ILIKE $1',
						values: {
							$1: 'J___n%'
						}
					}
				}
			}
		}
	}
}
