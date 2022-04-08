/* global data */
var $entryForm = document.querySelector('form#entry-form');
var $entryWeekday = document.querySelector('#weekday');
var $entryTime = document.querySelector('#time');
var $entryDescription = document.querySelector('#description');
var $entryBtn = document.querySelector('#submit-btn');

function submitHandler(event) {
  event.preventDefault();

  var entryObj = {
    weekday: $entryWeekday.value,
    time: $entryTime.value,
    description: $entryDescription.value,
    entryId: data.nextEntryID
  };
  data.nextEntryID++;

  data.entries.push(entryObj);
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

var $newEntryBtn = document.querySelector('#add-entry');

function newEntryBtnHandler(event) {
  modalVisibility(true);
}

$newEntryBtn.addEventListener('click', newEntryBtnHandler);

var $weekdaySelect = document.querySelector('.weekday-select');

function weekdaySelectHandler(event) {
  if (event.target.tagName === 'BUTTON') {
    data.viewWeekDay = event.target.value;
  }
}

$weekdaySelect.addEventListener('click', weekdaySelectHandler);

function createTableRow(entryObj) {
  var $tr = document.createElement('tr');
  var $tdTime = document.createElement('td');
  var $tdDescription = document.createElement('td');

  $tdTime.textContent = entryObj.time;
  $tdDescription.textContent = entryObj.description;

  $tr.append($tdTime, $tdDescription);
}

window.addEventListener('DOMContentLoaded', function (event) {

});
