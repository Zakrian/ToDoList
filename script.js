window.addEventListener('DOMContentLoaded', () => {

  const toDoListDB = [];

  const addForm = document.querySelector('form.top'),
    addInput = document.querySelector('.inputToDo'),
    addBtn = document.querySelector('.addToDo'),
    list = document.querySelector('.bottom'),
    listElement = document.querySelector('.bottomElement'),
    listItem = document.querySelectorAll('.toDoItem'),
    btnsWrapper = document.querySelectorAll('.btnsWrapper');

  // Добавление нового элемента
  function addNewItem() {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let value = addInput.value;

      //Добавление в массив
      if (value != '') {
        toDoListDB.push(value);
        makeSort(toDoListDB);
        addElement(value);
        // console.log(toDoListDB);
        addForm.reset();
      }
    });
  }

  //Добавление на страницу
  function addElement(text) {
    const liElement = document.createElement('li');
    liElement.classList.add('toDoItem');
    liElement.innerHTML = `
    <h2 class="text">${text}</h2>
      <div class="btnsWrapper">
        <a class="bottomBtn toDoItemEdit"></a>
        <a class="bottomBtn toDoItemDelete hideIcon"></a>
        <a class="bottomBtn toDoItemDelete"></a>
      </div>`;
    // console.log(liElement);

    list.insertAdjacentElement('beforeend', liElement);
  }

  //Сортировка списка по алфавиту
  function makeSort(arr) {
    arr.sort();
  }

  //Добавление вычеркивания
  function makeDone(el) {
    el.classList.toggle('complete');
  }

  //Удаление при нажатии на корзинку
  function makeDel(el) {
    document.querySelectorAll('.toDoItemDelete').forEach(item => {
      if (el == item) {
        el.parentElement.parentElement.remove();
      }
    });
  }

  //Редактирование при нажатии на карандаш
  function makeEdit(el) {
    document.querySelectorAll('.toDoItemEdit').forEach(item => {
      let h2 = el.parentElement.previousElementSibling;
      if (el == item) {
        h2.setAttribute('contentEditable', true);
        h2.focus();
        el.classList.remove('toDoItemEdit');
        el.classList.add('completeEdit');
      }
    });
  }

  //Завершение редактирования при нажатии на галочку
  function completeEdit(el) {
    const element = document.querySelector('.completeEdit');
    let h2 = el.parentElement.previousElementSibling;


    h2.removeAttribute('contentEditable');
    element.classList.add('toDoItemEdit');
    element.classList.remove('completeEdit');
  }

  //Вызов всех функций при определенных условиях
  list.addEventListener('click', e => {
    let target = e.target;

    if (target && target.classList.contains('toDoItemDelete')) {
      makeDel(target);
    }

    if (target && target.classList.contains('toDoItemEdit')) {
      makeEdit(target);
    } else if (target && target.classList.contains('completeEdit')) {
      completeEdit(target);
    }

    if (target && target.classList.contains('text')) {
      makeDone(target);
    }

  });

  //Создание элементов с учетом введенного в инпут
  addNewItem();

});