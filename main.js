let selectedDate = null;
const selectDateRangeElement = document.querySelector('#static-date-range');
const fromDateSelect = document.querySelector('#from-date');
const fromDateElement = document.querySelector('#from');
const toDateSelect = document.querySelector('#to-date');
const toDateElement = document.querySelector('#to');
const dateNow = new Date();
const dateRangePeriod = {
    'custom': 0,
    'today': 0,
    'yesterday': 1,
    'last7Days': 7,
    'last30Days': 30,
    'last90Days': 90,
};
const formatDate = {
    forUser: {
        year: "numeric",
        month: "long",
        day: "numeric",
    },
    forValue: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    },
};

const setDateRange = (value) => {
    if (value === 'today') {
        setAttribute(fromDateSelect, 'value', dateArrayToString(dateNow));
        setAttribute(toDateSelect, 'value', dateArrayToString(dateNow));
    }
    setAttribute(fromDateSelect, 'value', dateArrayToString(selectedDate));
    setAttribute(toDateSelect, 'value', dateArrayToString(dateNow));
};

const dayToMilliseconds = days => days * 24 * 60 * 60 * 1000;

const formattingDate = (date, format) => date.toLocaleDateString('en-En', format);

const showSelectDate = (element, date) => {
    element.innerHTML = formattingDate(date, formatDate.forUser)
};

const showDateRange = (selectValue) => {
    selectedDate = new Date(dateNow - dayToMilliseconds(dateRangePeriod[selectValue]));
    showSelectDate(fromDateElement, selectedDate);
    showSelectDate(toDateElement, dateNow);
    setDateRange(selectValue);
};

const getDateArray = date => formattingDate(date, formatDate.forValue).split('/');

const getDateValue = element => element.value;

const changeDateArray = array => array.unshift(array.pop());

const dateArrayToString = array => {
    let dateArray = getDateArray(array);
    changeDateArray(dateArray);
    return dateArray.join('-');
};

const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

const setSelectedDate = (element, date, message) => element.innerHTML = date ? formattingDate(new Date(date), formatDate.forUser) : `${message} date`;

const setDiapazoneDate = (element, attribute, ) => {

};

selectDateRangeElement.onchange = () => showDateRange(selectDateRangeElement.value);
fromDateSelect.onchange = () => {
    setSelectedDate(fromDateElement, getDateValue(fromDateSelect), 'From');
    setAttribute(toDateSelect,'min', getDateValue(fromDateSelect));
};
toDateSelect.onchange = () => {
    setSelectedDate(toDateElement, getDateValue(toDateSelect), 'To');
    setAttribute(fromDateSelect,'max', getDateValue(toDateSelect));
};