import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('TodoMVC', {
	beforeEach: function() {
		F.open('canjs');
	}
});

QUnit.test('basic todo functionality', function() {
	var newTodo = F('#new-todo');
	newTodo.type('FuncUnit [enter]');
	newTodo.type('is [enter]');
	newTodo.type('awesome! [enter]');
 
	F('.todo label:contains("FuncUnit")').visible('basic assert');
	F('.todo label:contains("is")').visible('basic assert');
	F('.todo label:contains("awesome")').visible('basic assert');
 
	F('.toggle:not(:checked)').click();
	F('.toggle:not(:checked)').click();
	F('.toggle:not(:checked)').click();
 
	F('#clear-completed').click();
	F('.todo.completed').missing('verifying completion');
});
 
QUnit.test('testing filters', function() {
	var newTodo = F('#new-todo');
	newTodo.type('Simple [enter]');
	newTodo.type('Event [enter]');
	newTodo.type('Simulation [enter]');
 
	F('.toggle:not(:checked)').click();
	F('.toggle:not(:checked)').click();
 
	F('a:contains("Active")').click();
	F('.todo label:contains("Simple")').invisible('active view');
	F('.todo label:contains("Event")').invisible('active view');
	F('.todo label:contains("Simulation")').visible('active view');
 
	F('a:contains("Completed")').click();
	F('.todo label:contains("Simple")').visible('completed view');
	F('.todo label:contains("Event")').visible('completed view');
	F('.todo label:contains("Simulation")').invisible('completed view');
 
	F('a:contains("All")').click();
	F('.todo label:contains("Simple")').visible('all view');
	F('.todo label:contains("Event")').visible('all view');
	F('.todo label:contains("Simulation")').visible('all view');
 
	F('.toggle:not(:checked)').click();
	F('#clear-completed').click();
	F('.todo.completed').missing('verifying completion');
});
 
QUnit.test('destroying todos', function() {
	F('#new-todo').type('Sweet. [enter]');
 
	F('.todo label:contains("Sweet.")').visible('basic assert');
	F('.destroy').click();
 
	F('.todo label:contains("Sweet.")').missing('destroyed todo');
});