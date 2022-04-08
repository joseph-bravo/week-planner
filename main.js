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

  console.log('entry obj', entryObj);
}

$entryForm.addEventListener('submit', submitHandler);
