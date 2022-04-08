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

function newEntryBtnHandler(entry) {
  modalVisibility(true);
}

$newEntryBtn.addEventListener('click', newEntryBtnHandler);
