/* exported data */
/* exported writeToLocal */

var data = {
  nextEntryID: 1,
  entries: [],
  view: 'entries',
  viewWeekDay: 'sun',
  editing: null,
  grabByWeekday: function (weekday) {
    return this.entries.filter(element => element.weekday === weekday);
  }
};

function writeToLocal() {
  localStorage.setItem('data', JSON.stringify(data));
}

function getFromLocal() {
  var localData = JSON.parse(localStorage.getItem('data'));
  for (var prop in localData) {
    data[prop] = localData[prop];
  }
  if (data.editing) {
    data.editing = data.getEntryObject(data.editing.entryId);
  }
}

getFromLocal();
