/* global data */
/* global writeToLocal */

var $entryForm = document.querySelector('form#entry-form');
var $entryWeekday = document.querySelector('#weekday');
var $entryTime = document.querySelector('#time');
var $entryDescription = document.querySelector('#description');
var $entryBtn = document.querySelector('#submit-btn');

function submitHandler(event) {
  event.preventDefault();
  if (!data.editing) {
    var entryObj = {
      weekday: $entryWeekday.value,
      time: $entryTime.value,
      description: $entryDescription.value,
      entryId: data.nextEntryID
    };
    data.nextEntryID++;

    data.entries.push(entryObj);
  } else {
    data.editing.weekday = $entryWeekday.value;
    data.editing.time = $entryTime.value;
    data.editing.description = $entryDescription.value;
  }
  $entryForm.reset();

  modalVisibility(false);
}

$entryForm.addEventListener('submit', submitHandler);
window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && event.ctrlKey) {
    $entryBtn.click();
  }
});

var $modal = document.querySelector('.modal');

function modalVisibility(bool) {
  if (bool) {
    $modal.classList.remove('hidden');
  } else {
    $modal.classList.add('hidden');
  }
}

var $popUp = document.querySelector('.pop-up');
$modal.addEventListener('click', function (event) {
  if (!event.path.includes($popUp)) {
    modalVisibility(false);
  }
});

var $newEntryBtn = document.querySelector('#add-entry');

function newEntryBtnHandler(event) {
  data.editing = null;
  modalVisibility(true);
}

$newEntryBtn.addEventListener('click', newEntryBtnHandler);

var $weekdaySelect = document.querySelector('.weekday-select');

var $weekdayHeader = document.querySelector('#sortedWeekday');

function weekdaySelectHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    data.viewWeekday = event.target.value;
    redrawPage(data.viewWeekday);
  }
}

$weekdaySelect.addEventListener('click', weekdaySelectHandler);

function createTableRow(entryObj) {
  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');
  var $tdDescription = document.createElement('td');
  var $tdButtons = document.createElement('td');
  var $btnEdit = document.createElement('button');
  var $btnDelete = document.createElement('button');

  $tdTime.textContent = entryObj.time;
  $tdDescription.textContent = entryObj.description;
  $btnEdit.textContent = 'EDIT';
  $btnDelete.textContent = 'DELETE';

  $btnEdit.classList.add('btn-edit');
  $btnDelete.classList.add('btn-delete');

  $tdButtons.append($btnEdit, $btnDelete);

  $tr.append($tdTime, $tdDescription, $tdButtons);

  $tr.dataset.entryId = entryObj.entryId;

  return $tr;
}

function fillEntryFormEdit(entryObj) {
  $entryWeekday.value = data.editing.weekday;
  $entryTime.value = data.editing.time;
  $entryDescription.value = data.editing.description;
}

function postButtonHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    var $trOfButton = event.target.closest('[data-entry-id]');
    var trOfButtonEntryId = JSON.parse($trOfButton.dataset.entryId);
    var trEntryObj = data.grabEntryById(trOfButtonEntryId);
    if (event.target.matches('.btn-edit')) {
      var editingID = trOfButtonEntryId;
      data.editing = data.grabEntryById(editingID);
      fillEntryFormEdit(data.editing);
      modalVisibility(true);
    } else if (event.target.matches('.btn-delete')) {
      var indexToDelete = data.entries.findIndex(element => element === trEntryObj);
      data.entries.splice(indexToDelete, 1);
      $trOfButton.remove();
    }
  }
}

var $plans = document.querySelector('#plans');

$plans.addEventListener('click', postButtonHandler);

function redrawPage(weekday) {
  $weekdayHeader.textContent = data.viewWeekday;
  while ($plans.children.length > 0) {
    $plans.children[0].remove();
  }
  var entriesInWeekday = data.grabByWeekday(weekday);
  for (var i = 0; i < entriesInWeekday.length; i++) {
    var $tr = createTableRow(entriesInWeekday[i]);
    entriesInWeekday[i].dom = $tr;
    $plans.append($tr);
  }
}

window.addEventListener('DOMContentLoaded', function (event) {
  redrawPage(data.viewWeekday);
});

window.addEventListener('beforeunload', function (event) {
  writeToLocal();
});
