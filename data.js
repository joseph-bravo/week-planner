/* exported data */
var data = {
  nextEntryID: 1,
  entries: [],
  view: 'entries',
  viewWeekDay: 'sun',
  editing: null,
  grabByWeekday: function (weekday) {
    console.log(this.entries.filter(element => element.weekday === weekday));
  }
};
