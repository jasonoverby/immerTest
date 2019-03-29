// https://egghead.io/lessons/redux-simplify-creating-immutable-data-trees-with-immer 
import produce from 'immer';

interface TodoObject {
  text: string;
  done: boolean;
}

const todos: Array<TodoObject> = [
  {
    text: 'eat',
    done: false,
  },
  {
    text: 'sleep',
    done: false,
  },
];

const todo: TodoObject = {
  text: 'have fun',
  done: true,
};

const nextTodos: object[] = produce(todos, (draft: Array<TodoObject>) => {
  // must do something to draft for outcome to be a different object
  draft.push(todo);
  draft[0].done = true;
});

console.log(nextTodos === todos); // false
console.log(nextTodos[0] === todos[0]);
console.log(nextTodos);
console.log(todos);
