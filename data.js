/* exported data */
/* exported writeToLocal */
/* exported reset */

var data = {
  nextEntryID: 1,
  entries: [],
  view: 'entries',
  viewWeekday: 'mon',
  editing: null,
  grabByWeekday: function (weekday) {
    return this.entries.filter(element => element.weekday === weekday);
  },
  grabEntryById: function (id) {
    return this.entries.find(element => element.entryId === id);
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
}

function reset() {
  data = {};
  localStorage.removeItem('data');
  window.location.reload();
}

getFromLocal();
