"use strict";
exports.__esModule = true;
var immer_1 = require("immer");
var todos = [
    {
        text: 'eat',
        done: false
    },
    {
        text: 'sleep',
        done: false
    },
];
var todo = {
    text: 'have fun',
    done: true
};
var nextTodos = immer_1["default"](todos, function (draft) {
    // must do something to draft for outcome to be a different object
    draft.push(todo);
    draft[0].done = true;
});
console.log(nextTodos === todos); // false
console.log(nextTodos[0] === todos[0]);
console.log(nextTodos);
console.log(todos);
