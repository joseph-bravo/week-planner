/* global data */
/* global writeToLocal */

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
  debugger;
  if (event.target.tagName === 'BUTTON') {
    data.viewWeekDay = event.target.value;
    redrawPage(data.viewWeekDay);
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

var $plans = document.querySelector('#plans');

function redrawPage(weekday) {
  while ($plans.children.length > 0) {
    $plans.children[0].remove();
  }
  var entriesInWeekday = data.grabByWeekday(weekday);
  for (var i = 0; i < entriesInWeekday.length; i++) {
    $plans.append(createTableRow(entriesInWeekday[i]));
  }
}

window.addEventListener('DOMContentLoaded', function (event) {
  redrawPage(data.viewWeekDay);
});

window.addEventListener('beforeunload', function (event) {
  writeToLocal();
});
